import { defineStore } from 'pinia'
import { ref } from 'vue'
import customerService from '@/services/customer'
import type Customer from './types/customer.type'
export const useCustomerStore = defineStore('customer', () => {
  const dialog = ref(false)
  const customers = ref<Customer[]>([])
  const editCustomer = ref<Customer & { files: File[] }>({
    name: '',
    tel: '',
    point: 0,
    image: 'no_image.jpg',
    files: []
  })

  const getCustomers = async () => {
    try {
      const res = await customerService.getCustomers()
      customers.value = res.data
    } catch (err) {
      console.log(err)
    }
  }
  const saveCustomer = async () => {
    try {
      const customer = await customerService.createCustomer(editCustomer.value)
    //   console.log(editCustomer.value)
    dialog.value = false;
    } catch (err) {
      console.log(err)
    }
  }

  return { getCustomers, editCustomer, dialog, customers, saveCustomer }
})
