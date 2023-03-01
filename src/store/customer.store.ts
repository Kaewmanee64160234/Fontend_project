import { defineStore } from 'pinia'
import { ref } from 'vue'
import customerService from '@/services/customer'
import type Customer from './types/customer.type'
import { useLoadingStore } from './loading'
export const useCustomerStore = defineStore('customer', () => {
  const loadingStore = useLoadingStore()
  const search = ref('');
  const selected = ref<string[] | any[]>([])
  const dialog = ref(false)
  const allSelected = ref(false)
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
      loadingStore.isLoading = true
      const res = await customerService.getCustomers()
      customers.value = res.data
      loadingStore.isLoading = false
    } catch (err) {
      console.log(err)
      
    }
  }
  const saveCustomer = async () => {
    try {
      loadingStore.isLoading = true

      if (!editCustomer.value.id) {
        await customerService.createCustomer(editCustomer.value)
        //   console.log(editCustomer.value)
      } else {
        await customerService.updateCustomer(editCustomer.value.id + '', editCustomer.value)
      }
      dialog.value = false

      await getCustomers()
      loadingStore.isLoading = false
    } catch (err) {
      console.log(err)
    }
  }
  const editedCustomer = async (item: Customer) => {
    loadingStore.isLoading = true

    editCustomer.value = JSON.parse(JSON.stringify(item))
    dialog.value = true
    loadingStore.isLoading = false
  }
  const deleteCustomer = async (id: string) => {
    loadingStore.isLoading = true

    await customerService.deleteCustomer(id)
    await getCustomers()
    loadingStore.isLoading = false
  }
  const selectCustomerAll = async () => {
    loadingStore.isLoading = true

    if (!allSelected.value) {
      selected.value = customers.value.map((customer) => customer.id + '')
    }
    loadingStore.isLoading = false
  }
  const selectCustomer = () => {
    allSelected.value = false
  }
  const deleteCustomers = async () => {
    loadingStore.isLoading = true

    for (let i = 0; i < selected.value.length; i++) {
      await customerService.deleteCustomer(selected.value[i])
      await getCustomers()
    }
    loadingStore.isLoading = false
  }

  return {
    deleteCustomers,
    selectCustomer,
    allSelected,
    selectCustomerAll,
    selected,
    deleteCustomer,
    getCustomers,
    editCustomer,
    dialog,
    customers,
    saveCustomer,
    editedCustomer,
    search
  }
})
