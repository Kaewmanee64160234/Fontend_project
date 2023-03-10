import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order } from './types/Order.type'
import type { OrderItem } from './types/orderItem.type'
import type Product from './types/product.type'

export const usePointOfSale = defineStore('point of sale', () => {
  const dialogPayment = ref(false)
  const dialogPrompypay = ref(false)
  const dialogPromotion = ref(false)
  const orderItemList = ref<OrderItem[]>([])
  const dialogTopping = ref(false)
  const toggle = ref(null)
  const toggle2 = ref(null)
  const amenities = ref([])
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
    customerId: '',
    discount: 0,
    total: 0,
    recieved: 0,
    change: 0,
    payment: '',
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
    amenities
  }
})
