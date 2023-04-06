import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Order } from '@/store/types/Order.type'
import orderService from '@/services/order'
import { useLoadingStore } from './loading'
import { useMessageStore } from './message'
export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore();
  const search = ref('');
  const tempOrder = ref<Order>({
    customerId: 1,
    discount: 0,
    total: 0,
    recieved: 0,
    change: 0,
    payment: 'promptpay'
  })

// about pagination
const page = ref(1)
const take = ref(5)
const keyword = ref('')
const order = ref('DESC')
const orderBy = ref('')
const lastPage = ref(0)
const startDate = ref('')
const endDate = ref('')

watch(page, async (newPage, oldPage) => {
  await getOrders()
})
watch(keyword, async (newKey, oldKey) => {
  if(keyword.value.length >=3){
    await getOneOrder(keyword.value)
  }
  if(keyword.value.length ===0){
    await getOneOrder(keyword.value)


  }
  
})
watch(lastPage, async (newlastPage, oldlastPage) => {
  if (newlastPage < page.value) {
    page.value = 1
  }
})


  const getOrders = async () => {
    loadingStore.isLoading = true
    try {
      const response = await orderService.getOrders({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
        order: order.value,
        orderBy: orderBy.value,
        dateMin: startDate.value,
        dateMax: endDate.value
      })
      lastPage.value = response.data.lastPage
      console.log(response.data.data)
      orders.value = response.data.data
    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถดึงข้อมูลได้");

    }

    loadingStore.isLoading = false
  }

  const getOneOrder = async (id:string) => {
    loadingStore.isLoading = true
    try {
      const response = await orderService.getOneOrder(id);
      tempOrder.value = response.data
      orders.value = [];
      orders.value.push(tempOrder.value);
      console.log(tempOrder.value)
    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถดึงข้อมูลได้");

    }

    loadingStore.isLoading = false
  }
  return {   page,
    keyword,
    take,
    order,
    orderBy,
    lastPage, getOrders, orders, getOneOrder, tempOrder ,  search }
})

