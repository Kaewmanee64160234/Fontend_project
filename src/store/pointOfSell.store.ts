import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Product from './types/product.type'
import type { OrderItem } from './types/orderItem.type'
import { useLoadingStore } from './loading'
import orderService from '@/services/order'
import type { Order } from '@/store/types/Order.type'

export const usePointOfSale = defineStore('point of sale', () => {
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
  const pointofsaleStore = usePointOfSale();
    const total_ = ref(0);
    const total_dicount = ref(0);
    const totalAndDicount = ref(0);
    const recive_mon = ref(0);
    const change_money = ref(0);
    const CaltotalPrice = () => {
        if (pointofsaleStore.orderItemList.length > 0) {
         total_.value =  orderItemList.value.reduce(
            (accumulator, currentValue) => accumulator + currentValue.total,
            0
          )
          return {total_,totalAndDicount,change_money}
        } else {
            total_.value = 0;
            return {total_}
        }
    };
    const CalDiscout = (discout: number) => {
        total_dicount.value += discout;
      };
      const calMonAndDiscount = () => {
        if (total_.value > 0) {
          totalAndDicount.value = total_.value - total_dicount.value;
        }
    
        if (recive_mon.value > 0) {
          if (recive_mon.value - totalAndDicount.value >= 0) {
            change_money.value = recive_mon.value - totalAndDicount.value;
          } else {
            change_money.value = 0;
          }
        }
      };

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
    // const orderItems = orderList.value.map(item) => 
    // <{ productId: number; amount: number}> {
    //   productId = item.product.id,
    //   amount = item.amount,}
    // };
    loadingStore.isLoading = true;
    try {
      console.log(order.value);
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
    }
    loadingStore.isLoading = false;
  }

  return {
    total_,
    total_dicount,
    CaltotalPrice,
    CalDiscout,
    recive_mon,
    totalAndDicount,
    change_money,
    calMonAndDiscount,
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
