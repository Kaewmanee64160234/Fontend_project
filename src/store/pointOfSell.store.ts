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
  const pointofsaleStore = usePointOfSale();
    const total_ = ref(0);
    const total_dicount = ref(0);
    const totalAndDicount = ref(0);
    const recive_mon = ref(0);
    const change_money = ref(0);
    const CaltotalPrice = () => {
        if (pointofsaleStore.orderItemList.length > 0) {
            let cal = 0;
            for (let i = 0; i < pointofsaleStore.orderItemList.length; i++) {
                cal += pointofsaleStore.orderItemList[i].amount;
            }
            total_.value = cal;
        } else {
            total_.value = 0;
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
    amenities
  }
})
