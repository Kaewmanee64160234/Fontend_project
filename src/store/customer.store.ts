import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import customerService from '@/services/customer'
import type Customer from './types/customer.type'
import { useLoadingStore } from './loading'
import { useMessageStore } from './message'
export const useCustomerStore = defineStore('customer', () => {
  const loadingStore = useLoadingStore()
  const search = ref('');
  const selected = ref<string[] | any[]>([])
  const dialog = ref(false)
  const allSelected = ref(false)
  const customers = ref<Customer[]>([])
  const messageStore = useMessageStore()
  const editCustomer = ref<Customer & { files: File[] }>({
    name: '',
    tel: '',
    point: 0,
    image: 'no_image.jpg',
    files: []
  })
  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editCustomer.value = {
        name: '',
        tel: '',
        point: 0,
        image: 'no_image.jpg',
        files: []
      };
    }
  });
  const getCustomers = async () => {
    loadingStore.isLoading = true

    try {
      const res = await customerService.getCustomers()
      customers.value = res.data
    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถดึงข้อมูลลูกค้าได้");
      
    }
    loadingStore.isLoading = false

  }
  const saveCustomer = async () => {
    loadingStore.isLoading = true

    try {

      if (!editCustomer.value.id) {
        await customerService.createCustomer(editCustomer.value)
        //   console.log(editCustomer.value)
      } else {
        await customerService.updateCustomer(editCustomer.value.id + '', editCustomer.value)
      }
      dialog.value = false

      await getCustomers()
    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถsaveข้อมูลลูกค้าได้");

    }
    loadingStore.isLoading = false

  }
  const editedCustomer = async (item: Customer) => {
    loadingStore.isLoading = true

    editCustomer.value = JSON.parse(JSON.stringify(item))
    dialog.value = true
    loadingStore.isLoading = false
  }
  const deleteCustomer = async (id: string) => {
    loadingStore.isLoading = true

    try{

      await customerService.deleteCustomer(id)
      await getCustomers()
    }catch (err) {
      messageStore.showError("ไม่สามารถdeleteข้อมูลลูกค้าได้");
    }
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
  const AddPoint = (phone: string) => {
    const customer = customers.value.findIndex((customer) => customer.tel === phone);
    customers.value[customer].point += 5;
  }
  const deleteCustomers = async () => {
    try{
      loadingStore.isLoading = true

      for (let i = 0; i < selected.value.length; i++) {
        await customerService.deleteCustomer(selected.value[i])
        await getCustomers()
      }
      loadingStore.isLoading = false
    }catch(err){
      messageStore.showError("ไม่สามารถdeleteข้อมูลลูกค้าได้");

    }

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
    search,
    AddPoint
  }
})
