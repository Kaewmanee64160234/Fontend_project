import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order } from '@/store/types/Order.type'
import orderService from '@/services/order'
import { useLoadingStore } from './loading'
import { useMessageStore } from './message'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore();
  const tempOrder = ref<Order>({
    customerId: 1,
    discount: 0,
    total: 0,
    recieved: 0,
    change: 0,
    payment: 'promptpay'
  })
  const getOrders = async () => {
    loadingStore.isLoading = true
    try {
      const response = await orderService.getOrders()
      orders.value = response.data
    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถดึงข้อมูลได้");

    }

    loadingStore.isLoading = false
  }

  const getOneOrder = async (id: string) => {
    loadingStore.isLoading = true
    try {
      const response = await orderService.getOneOrder(id)
      tempOrder.value = response.data
    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถดึงข้อมูลได้");

    }

    loadingStore.isLoading = false
  }
  return { getOrders, orders, getOneOrder, tempOrder }
})
