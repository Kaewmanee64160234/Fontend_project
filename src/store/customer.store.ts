import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import customerService from '@/services/customer'
import type Customer from './types/customer.type'
import { useLoadingStore } from './loading'
import { useMessageStore } from './message'
import { usePointOfSale } from './pointOfSell.store'
import customer from '@/services/customer'
export const useCustomerStore = defineStore('customer', () => {
  const pointofsellStore = usePointOfSale()
  const loadingStore = useLoadingStore()
  const dialogCheckPoint= ref(false)
  const dialogCheckPromotion= ref(false)  
  const dialogPoint = ref(false);
  const search = ref('');
  const selected = ref<string[] | any[]>([])
  const dialog = ref(false)
  const allSelected = ref(false)
  const customers = ref<Customer[]>([])
  const customer = ref<Customer>();
  const messageStore = useMessageStore()
  const customerId = ref('');
  const loading = ref(false)
  const loaded = ref(false);
  const addCustomerDialog = ref(false)
  const editCustomer = ref<Customer & { files: File[] }>({
    name: '',
    tel: '',
    point: 0,
    // image: 'no_image.jpg',
    files: []
  })
  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editCustomer.value = {
        name: '',
        tel: '',
        point: 0,
        // image: 'no_image.jpg',
        files: []
      };
    }
  });

// about pagination
const page = ref(1)
const take = ref(5)
const keyword = ref('')
const order = ref('ASC')
const orderBy = ref('')
const lastPage = ref(0)

watch(page, async (newPage, oldPage) => {
  await getCustomers()
})
watch(keyword, async (newKey, oldKey) => {
  if(keyword.value.length >=3){
    await getCustomers()
  }
  if(keyword.value.length ===0){
    await getCustomers()
  }
})
watch(dialog, (newDialog, oldDialog) => {
  console.log(newDialog)
  if (!newDialog) {
    editCustomer.value = { 
      name: '',
      tel: '',
      point: 0,
      // image: 'no_image.jpg',
      files: []
    }
  }
})

watch(addCustomerDialog, (newDialog, oldDialog) => {
  console.log(newDialog)
  if (!newDialog) {
    editCustomer.value = { 
      name: '',
      tel: '',
      point: 0,
      // image: 'no_image.jpg',
      files: []
    }
  }
})


watch(lastPage, async (newlastPage, oldlastPage) => {
  if (newlastPage < page.value) {
    page.value = 1
  }
})

  const getCustomers = async () => {
    loadingStore.isLoading = true

    try {
      const res = await customerService.getCustomers({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
        order: order.value,
        orderBy: orderBy.value
      })
      customers.value = res.data.data
      lastPage.value = res.data.lastPage
    } catch (err) {
      console.log(err)
      messageStore.showError("Oops!, cannot get data customers.");
      
    }
    loadingStore.isLoading = false

  }
  const saveCustomer = async () => {
    loadingStore.isLoading = true

    try {

      if (!editCustomer.value.id) {
        await customerService.createCustomer(editCustomer.value)
          console.log(editCustomer.value)
      } else {
        console.log(editCustomer.value)

        await customerService.updateCustomer(editCustomer.value.id + '', editCustomer.value)
      }
      dialog.value = false
      addCustomerDialog.value = false

      await getCustomers()
    } catch (err) {
      console.log(err)
      messageStore.showError("Cannot save customer");

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
      messageStore.showError("Cannot delete customer");
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
  const deleteCustomers = async () => {
    try{
      loadingStore.isLoading = true

      for (let i = 0; i < selected.value.length; i++) {
        await customerService.deleteCustomer(selected.value[i])
        await getCustomers()
      }
      loadingStore.isLoading = false
    }catch(err){
      messageStore.showError("Cannot delete customer");

    }

  }
  const addPointCustomer = async (id:string) => {
    loadingStore.isLoading = true
    try {
      const customer = customers.value.findIndex((customer) => customer.id+'' === id);
      customers.value[customer].point += 5;
      await customerService.updateCustomer(id,{...customers.value[customer]})
      customerId.value = customers.value[customer].id+''
      pointofsellStore.order.customerId = customers.value[customer].id+'';
    } catch (e) {
      messageStore.showError("Unable to add customer point");
      console.log(e);
    }
    loadingStore.isLoading = false
}

const getCustomerByTel = async () => {
  
    try{
      if(search.value !== ''){
        loading.value = true
        const res = await  customerService.findCustomerBytel(search.value);
    
        setTimeout(() => {
          loading.value = false
          loaded.value = true
        }, 2000)
      customers.value = res.data;
      }else{
        await getCustomers();
      }
    
  
    }catch(err){console.log(err);}
  
}

const getCustomerByPhone = async (phone:string)=>{
  const res = await  customerService.findCustomerBytel(phone);
  customer.value = res.data;
  return res.data;

}
  return {
    page,
    keyword,
    take,
    order,
    orderBy,
    lastPage,
    getCustomerByTel,
    customerId,
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
    addPointCustomer,
    customerService,
    loaded,
    loading,
    addCustomerDialog,
    dialogCheckPoint,
    dialogCheckPromotion,
    getCustomerByPhone,
    customer,
    dialogPoint, 

  }
})
