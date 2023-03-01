import { defineStore } from 'pinia'
import { ref } from 'vue'
import employeeService from '@/services/employee'
import type Employee from './types/employee.type'
export const useEmployeeStore = defineStore('employee', () => {
  const selected = ref<string[] | any[]>([])
  const dialog = ref(false)
  const allSelected = ref(false)
  const employees = ref<Employee[]>([])
  const editEmployee = ref<Employee & { files: File[] }>({
    name: '',
    address: '',
    tel: '',
    email: '',
    position: '',
    hourly: 0,

    image: 'no_image.jpg',
    files: []
  })

  const getEmployees = async () => {
    try {
      const res = await employeeService.getEmployees()
      employees.value = res.data
    } catch (err) {
      console.log(err)
    }
  }
  const saveEmployee = async () => {
    try {
      if (!editEmployee.value.id) {
        await employeeService.createEmployee(editEmployee.value)
        //   console.log(editEmployee.value)
      } else {
        await employeeService.updateEmployee(editEmployee.value.id + '', editEmployee.value)
      }
      dialog.value = false

      await getEmployees()
    } catch (err) {
      console.log(err)
    }
  }
  const editedEmployee = async (item: Employee) => {
    editEmployee.value = JSON.parse(JSON.stringify(item))
    dialog.value = true
  }
  const deleteEmployee = async (id: string) => {
    await employeeService.deleteEmployee(id)
    await getEmployees()
  }
  const selectEmployeeAll = async () => {
    if (!allSelected.value) {
      selected.value = employees.value.map((employee) => employee.id + '')
    }
  }
  const selectEmployee = () => {
    allSelected.value = false
  }
  const deleteEmployees = async () => {
    for (let i = 0; i < selected.value.length; i++) {
      await employeeService.deleteEmployee(selected.value[i])
      await getEmployees()
    }
  }

  return {
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
    editedEmployee
  }
})
