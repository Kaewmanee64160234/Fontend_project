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
  const ss_Last = ref<SummarySalary>()

  const editEmployee = ref<Employee & { files: File[] }>({
    name: '',
    address: '',
    tel: '',
    email: '',
    position: '',
    hourly: 0,
    image: 'no_image.jpg',
    files: [],
    check_in_outs: [],
    salary: 9000,
    fullTime: false
  })
  const checkInOut = ref<CheckInOut>({
    id: 0,
    employeeId: 0,

    total_hour: 0,

    employee: {
      name: '',
      address: '',
      tel: '',
      email: '',
      position: '',
      hourly: 0,
      image: 'no_image.jpg',
      check_in_outs: [],
      salary: 9000,
      fullTime: false
    }
  })
  const checkInOuts = ref<CheckInOut[]>([])
  const summary_salary = ref<SummarySalary>({
    id: 0,
    hour: 0,
    salary: 9000,
    checkInOut: [
      {
        id: 0,
        employeeId: 0,

        total_hour: 0,

        employee: {
          name: '',
          address: '',
          tel: '',
          email: '',
          position: '',
          hourly: 0,
          image: 'no_image.jpg',
          check_in_outs: [],
          salary: 9000,
          fullTime: false
        }
      }
    ],
    paid: false
  })
  const summary_salaries = ref<SummarySalary[]>([
    {
      id: 0,
      hour: 0,
      salary: 9000,
      checkInOut: [
        {
          id: 0,
          employeeId: 0,

          total_hour: 0,

          employee: {
            name: '',
            address: '',
            tel: '',
            email: '',
            position: '',
            hourly: 0,
            image: 'no_image.jpg',
            check_in_outs: [],
            salary: 9000,
            fullTime: false
          }
        }
      ],
      paid: false
    }
  ])
  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editEmployee.value = {
        name: '',
        address: '',
        tel: '',
        email: '',
        position: 'Barista',
        hourly: 0,
        image: 'no_image.jpg',
        files: [],
        check_in_outs: [],
        salary: 9000,
        fullTime: false
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

  watch(page, async (newPage, oldPage) => {
    await getEmployees()
  })
  watch(keyword, async (newKey, oldKey) => {
    await getEmployees()
  })
  // watch(keyword, async (newKey, oldKey) => {
  //   await getAllSummarySalary()

  // })
  // watch(page, async (newPage, oldPage) => {
  //   await getAllSummarySalary()
  // })
  watch(lastPage, async (newlastPage, oldlastPage) => {
    if (newlastPage < page.value) {
      page.value = 1
    }
  })
  // about checkIn checkout
  const checkIn = ref(true)

  watch(page, async (newPage, oldPage) => {
    await getEmployees()
  })
  watch(keyword, async (newKey, oldKey) => {
    await getEmployees()
  })
  watch(keyword, async (newKey, oldKey) => {
    if (keyword.value.length >= 3) {
      await getAllSummarySalary()
    }
    if (keyword.value.length === 0) {
      await getAllSummarySalary()
    }
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
      messageStore.showError('Oops!, cannot get employees.')
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
      messageStore.showError('Cannot save employee')
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
      messageStore.showError('Cannot delete employee')
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
      messageStore.showError('Cannot delete employee')
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
      checkInOut.value.createdDate = new Date()
      const res = await employeeService.employeeCheckIn(checkInOut.value)
      console.log(res.data)
      await getOneEmployee(editEmployee.value.id + '')
      // await getSummarySalaryEmp(editEmployee.value.id + '')
      checkIn.value = false
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
      await getSummarySalaryEmp(editEmployee.value.id + '')
      checkIn.value = true



    } catch (err) {
      console.log(err)
    }
    loadingStore.isLoading = false
  }
  const getSummarySalaryEmp = async (id: string) => {
    const res = await employeeService.getSummaryByEmployeeId(id + '')
    summary_salaries.value = [...res.data]
    console.log(summary_salaries.value)
  }
  const getOneSummaryBySSID = async (id: string) => {
    console.log(id)
    const res = await employeeService.getSummarySalaryById(id)
    summary_salary.value = res.data
  }
  const getOneEmployee = async (id: string) => {
    console.log(id)
    loadingStore.isLoading = true
    try {
      const res = await employeeService.getOneEmployee(id)
      editEmployee.value = res.data
      console.log(editEmployee.value)

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
  const getSummaryById = async (id: string) => {
    const res = await employeeService.getSummarySalaryById(id)
    summary_salary.value = res.data
    console.log(summary_salary.value)
  }
  const updatePaidStatusSS = async (idSS: string) => {
    loadingStore.isLoading = true
    try {
      const ss = {
        paid: true
      }
      await employeeService.updateSummarySalary(idSS, ss)
      console.log('update summary status cpaid completed')
      await getSummarySalaryEmp(idSS)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
    loadingStore.isLoading = false
  }

  return {
    ss_Last,
    updatePaidStatusSS,
    getSummaryById,
    getCioByIdEmp,
    page,
    keyword,
    take,
    order,
    orderBy,
    lastPage,
    getOneSummaryBySSID,
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
    getSummarySalaryEmp,
    getOneEmployee,
    employeeId,
    checkIn
  }
})
