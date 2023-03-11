import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order } from '@/store/types/Order.type'
import orderService from '@/services/order'
import { useLoadingStore } from './loading'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const loadingStore = useLoadingStore();
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

    const response = await orderService.getOrders()
    orders.value = response.data
    loadingStore.isLoading = false

  }

  const getOneOrder = async (id: string) => {
    loadingStore.isLoading = true

    const response = await orderService.getOneOrder(id)
    tempOrder.value = response.data;
    loadingStore.isLoading = false

  }
  return { getOrders, orders, getOneOrder,tempOrder }
})
