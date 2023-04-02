import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import employeeService from '@/services/employee'
import type Employee from './types/employee.type'
import { useLoadingStore } from './loading'
import { useMessageStore } from './message'
import type { CheckInOut } from './types/CheckInOut'
import type { SummarySalary } from './types/SummarySalary.type'
export const useEmployeeStore = defineStore('employee', () => {
  const loadingStore = useLoadingStore()
  const employeeId = ref('')
  const search = ref('')
  const loading = ref(false)
  const loaded = ref(false)
  const selected = ref<string[] | any[]>([])
  const dialog = ref(false)
  const allSelected = ref(false)
  const employees = ref<Employee[]>([])
  const messageStore = useMessageStore()
  const editEmployee = ref<Employee & { files: File[] }>({
    name: '',
    address: '',
    tel: '',
    email: '',
    position: '',
    hourly: 0,
    image: 'no_image.jpg',
    files: [],
    check_in_outs: []
  })
  const checkInOut = ref<CheckInOut>({})
  const checkInOuts = ref<CheckInOut[]>([])
  const summary_salary = ref<SummarySalary>({})
  const summary_salaries = ref<SummarySalary[]>([])
  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editEmployee.value = {
        name: '',
        address: '',
        tel: '',
        email: '',
        position: '',
        hourly: 0,
        image: 'no_image.jpg',
        files: [],
        check_in_outs: []
      }
    }
  })

  // about pagination
  const page = ref(1)
  const take = ref(5)
  const keyword = ref('')
  const order = ref('ASC')
  const orderBy = ref('')
  const lastPage = ref(0)

  // about checkIn checkout
  const checkIn = ref(true)

  watch(page, async (newPage, oldPage) => {
    await getEmployees()
  })
  watch(keyword, async (newKey, oldKey) => {
    await getEmployees()
  })
  watch(keyword, async (newKey, oldKey) => {
    await getAllSummarySalary()
  })
  watch(page, async (newPage, oldPage) => {
    await getAllSummarySalary()
  })
  watch(lastPage, async (newlastPage, oldlastPage) => {
    if (newlastPage < page.value) {
      page.value = 1
    }
  })

  const getEmployees = async () => {
    loadingStore.isLoading = true

    try {
      const res = await employeeService.getEmployees({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
        order: order.value,
        orderBy: orderBy.value
      })
      employees.value = res.data.data
      lastPage.value = res.data.lastPage
    } catch (err) {
      console.log(err)
      messageStore.showError('ไม่สามารถดึงข้อมูลพนักงานได้')
    }
    loadingStore.isLoading = false
  }
  const saveEmployee = async () => {
    loadingStore.isLoading = true

    try {
      if (!editEmployee.value.id) {
        await employeeService.createEmployee(editEmployee.value)
        console.log(editEmployee.value)
      } else {
        await employeeService.updateEmployee(editEmployee.value.id + '', editEmployee.value)
      }
      dialog.value = false

      await getEmployees()
    } catch (err) {
      console.log(err)
      messageStore.showError('ไม่สามารถsaveข้อมูลพนักงานได้')
    }
    loadingStore.isLoading = false
  }
  const editedEmployee = async (item: Employee) => {
    loadingStore.isLoading = true

    editEmployee.value = JSON.parse(JSON.stringify(item))
    dialog.value = true
    loadingStore.isLoading = false
  }
  const deleteEmployee = async (id: string) => {
    loadingStore.isLoading = true

    try {
      await employeeService.deleteEmployee(id)
      await getEmployees()
    } catch (err) {
      messageStore.showError('ไม่สามารถdeleteข้อมูลพนักงานได้')
    }
    loadingStore.isLoading = false
  }
  const selectEmployeeAll = async () => {
    loadingStore.isLoading = true

    if (!allSelected.value) {
      selected.value = employees.value.map((employee) => employee.id + '')
    }
    loadingStore.isLoading = false
  }
  const selectEmployee = () => {
    allSelected.value = false
  }
  const deleteEmployees = async () => {
    try {
      loadingStore.isLoading = true

      for (let i = 0; i < selected.value.length; i++) {
        await employeeService.deleteEmployee(selected.value[i])
        await getEmployees()
      }
      loadingStore.isLoading = false
    } catch (err) {
      messageStore.showError('ไม่สามารถdeleteข้อมูลพนักงานได้')
    }
  }
  const loginEmployee = async (name: string, email: string) => {
    const employee = await employeeService.employeeLogin(name, email)
    localStorage.setItem('employee', JSON.stringify(employee))
  }
  const empCheckIn = async (id: number) => {
    loadingStore.isLoading = true
    try {
      checkInOut.value.employeeId = id
      const res = await employeeService.employeeCheckIn(checkInOut.value)
      console.log(res.data)
      await getOneEmployee(editEmployee.value.id + '')
      checkIn.value = false;
    } catch (err) {
      console.log(err)
    }
    loadingStore.isLoading = false
  }

  const empCheckOut = async (id: string) => {
    loadingStore.isLoading = true
    try {
      console.log(id)
      const res = await employeeService.employeeCheckOut(id)
      console.log(res.data)
      await getOneEmployee(editEmployee.value.id + '')
      checkIn.value = true;
    } catch (err) {
      console.log(err)
    }
    loadingStore.isLoading = false
  }
  const getOneSummarySalaryEmp = async (id: string) => {
    const res = await employeeService.getOneSummaryByEmployeeId(id + '')
    summary_salary.value = res.data[0]

    console.log(res.data);
  }
  const getOneEmployee = async (id: string) => {
    loadingStore.isLoading = true
    try {
      const res = await employeeService.getOneEmployee(id)
      editEmployee.value = res.data
      if (editEmployee.value.check_in_outs[0].time_out === null) {
        checkIn.value = false
      } else {
        checkIn.value = true
      }
    } catch (err) {
      console.log(editEmployee.value)
    }
    loadingStore.isLoading = false
  }
  const getEmployeeByName = async () => {
    try {
      if (search.value !== '') {
        loading.value = true
        const res = await employeeService.findEmployeeByName(search.value)

        setTimeout(() => {
          loading.value = false
          loaded.value = true
        }, 2000)
        employees.value = res.data
      } else {
        await getEmployees()
      }
    } catch (err) {
      console.log(err)
    }
  }
  const getAllSummarySalary = async () => {
    loadingStore.isLoading = true
    try {
      const res = await employeeService.getAllSummarySalary({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
        order: order.value,
        orderBy: orderBy.value
      })
      summary_salaries.value = res.data.data
      lastPage.value = res.data.lastPage
    } catch (err) {
      console.log(err)
    }
    loadingStore.isLoading = false
  }
  const getCioByIdEmp = async (empId: string) => {
    loadingStore.isLoading = true
    try {
      const res = await employeeService.getCioByIdEmp({
        page: page.value,
        take: take.value,
        empId: empId,
        order: 'DESC',
        orderBy: orderBy.value
      })
      lastPage.value = res.data.lastPage

      checkInOuts.value = res.data.data
    } catch (err) {
      console.log(err)
    }
    loadingStore.isLoading = false
  }
  return {
    getCioByIdEmp,
    page,
    keyword,
    take,
    order,
    orderBy,
    lastPage,

    getAllSummarySalary,
    loaded,
    loading,
    getEmployeeByName,
    deleteEmployees,
    selectEmployee,
    allSelected,
    selectEmployeeAll,
    selected,
    deleteEmployee,
    getEmployees,
    editEmployee,
    dialog,
    employees,
    saveEmployee,
    editedEmployee,
    search,
    loginEmployee,
    checkInOut,
    checkInOuts,
    summary_salaries,
    summary_salary,
    empCheckIn,
    empCheckOut,
    getOneSummarySalaryEmp,
    getOneEmployee,
    employeeId,
    checkIn
  }
})
