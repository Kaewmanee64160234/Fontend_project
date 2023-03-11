import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Product from './types/product.type'
import type { OrderItem } from './types/orderItem.type'
import type { Order } from './types/order.type'
import { useLoadingStore } from './loading'
import orderService from '@/services/order'
import { useMessageStore } from './message'
import { useAuthStore } from './auth'

export const usePointOfSale = defineStore('point of sale', () => {
  const authStore = useAuthStore();
  const messageStore = useMessageStore();
  const dialogPayment = ref(false)
  const dialogPrompypay = ref(false)
  const dialogPromotion = ref(false)
  const orderItemList = ref<OrderItem[]>([])
  const dialogTopping = ref(false)
  const toggle = ref(null)
  const toggle2 = ref(null)
  const amenities = ref([])
  const loadingStore = useLoadingStore();
  const temProduct = ref<Product>({
    name: '',
    catagoryId: 1,
    category: '',
    type: '',
    size: '-',
    price: 0,
    image: 'no_image.jpg',
    files: []
  })
  const order = ref<Order>({
    customerId: 1,
    discount: 0,
    total: 0,
    recieved: 0,
    change: 0,
    payment: 'promptpay',
    orderItems: orderItemList.value
  })

  const addToOrder = (orderItem: OrderItem) => {
    orderItemList.value.push(orderItem)
  }

  const updatetmpProduct = (product: Product) => {
    temProduct.value = product
     toggle.value = null
     toggle2.value = null
     amenities.value = []
    return temProduct.value
  }

  async function openOrder() {
    loadingStore.isLoading = true;
    try {
      
      const res = await orderService.saveOrder(order.value);
      console.log(res.data);
     
      order.value = {
        customerId: 1,
        discount: 0,
        total: 0,
        recieved: 0,
        change: 0,
        payment: 'promptpay',
        orderItems: orderItemList.value
      };
      orderItemList.value = [];

  
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึกข้อมูล Orders ได้");
    }
    loadingStore.isLoading = false;
  }

  return {
    updatetmpProduct,
    temProduct,
    dialogTopping,
    dialogPayment,
    dialogPromotion,
    dialogPrompypay,
    orderItemList,
    addToOrder,
    order,
    toggle,
    toggle2,
    amenities,
    openOrder
  }
})
