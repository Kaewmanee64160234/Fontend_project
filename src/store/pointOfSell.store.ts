import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Product from './types/product.type'
import type { OrderItem } from './types/orderItem.type'
import { useLoadingStore } from './loading'
import orderService from '@/services/order'
import { useMessageStore } from './message'
import type { Order } from '@/store/types/Order.type'
import { useCustomerStore } from './customer.store'
import { useOrderStore } from './order.store'

export const usePointOfSale = defineStore('point of sale', () => {
  const messageStore = useMessageStore();
  const orderStore = useOrderStore();
  const dialogPayment = ref(false)
  const dialogPrompypay = ref(false)
  const customerStore = useCustomerStore( )
  const dialogPromotion = ref(false)
  const realCode = ref("");
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
    discount: 10,
    total: 0,
    recieved: 0,
    change: 0,
    payment: 'promptpay',
    orderItems: orderItemList.value
  })
  const promo = ref([
    {
      id: 1,
      name: "แฮปปี้รับแต้ม",
      price: 10,
      point: 50,
      code: "HAPPY250",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Advanced_Info_Service_logo.svg/2560px-Advanced_Info_Service_logo.svg.png",
    },
    {
      id: 2,
      name: "แลกคะแนนลดราคา",
      price: 10,
      point: 100,
      code: "Point10010",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Advanced_Info_Service_logo.svg/2560px-Advanced_Info_Service_logo.svg.png",
    },
    {
      id: 3,
      name: "ช้อปครบลดราคา",
      price: 5,
      point: 0,
      code: "Shop1005",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Advanced_Info_Service_logo.svg/2560px-Advanced_Info_Service_logo.svg.png",
    },
    {
      id: 4,
      name: "DTAC Reward",
      price: 20,
      point: 5,
      code: "Shop1006",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Advanced_Info_Service_logo.svg/2560px-Advanced_Info_Service_logo.svg.png",
    },
    {
      id: 5,
      name: "AIS Reward",
      price: 20,
      point: 5,
      code: "Shop1007",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Advanced_Info_Service_logo.svg/2560px-Advanced_Info_Service_logo.svg.png",
    },
    {
      id: 6,
      name: "TRUE Reward",
      price: 20,
      point: 10,
      code: "Shop1008",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Advanced_Info_Service_logo.svg/2560px-Advanced_Info_Service_logo.svg.png",
    },
  ]);
  const pointofsaleStore = usePointOfSale();
  const dialogComplteOrder = ref(false);
  const total_ = ref(0);
  const total_discount = ref(0);
  const totalAndDicount = ref(0);
  const recive_mon = ref(0);
  const change_money = ref(0);
  const CaltotalPrice = () => {
    if (pointofsaleStore.orderItemList.length > 0) {
      total_.value = orderItemList.value.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total,
        0
      )
      if ((total_.value - total_discount.value) <= 0) {
        totalAndDicount.value = 0
      } else {
        totalAndDicount.value = total_.value - total_discount.value;
      }
      change_money.value = recive_mon.value - totalAndDicount.value
      if (recive_mon.value <= 0) {
        change_money.value = 0;
      }
      if (recive_mon.value > 0) {
        if (change_money.value < 0) {
          messageStore.showError(
            `Money not enough : ${(change_money.value)
            } Bath`
          );
        }
      }


      return { total_, totalAndDicount, change_money }
    } else {
      total_.value = 0;
      return { total_ }
    }

  };
  const CalDiscout = () => {
    if (pointofsaleStore.orderItemList.length > 0) {
      total_discount.value = total_discount.value + order.value.discount,
        0
      return { total_discount }
    } else {
      total_discount.value = 0;
      return { total_discount }
    }
  };
  const calMonAndDiscount = () => {
    if (pointofsaleStore.orderItemList.length > 0) {
      totalAndDicount.value = total_.value - total_discount.value;
    }
    if (recive_mon.value > 0) {
      if (recive_mon.value - totalAndDicount.value >= 0) {
        change_money.value = recive_mon.value - totalAndDicount.value;
      } else {
        change_money.value = 0;
      }
    }
    return { totalAndDicount }
  };
  const deleteAllOrder = async () => {
    orderItemList.value = []
  }

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
      if (order.value.orderItems?.length === 0) {
        messageStore.showError("ไม่สามารถบันทึกข้อมูล Orders ได้");
        loadingStore.isLoading = false;
        return;
      }
      if (order.value.payment === "promptpay") {
        order.value = {
          customerId: parseInt(customerStore.customerId),
          discount: total_discount.value,
          total: totalAndDicount.value,
          recieved: totalAndDicount.value,
          change: 0,
          payment: 'promptpay',
          orderItems: orderItemList.value
        }
      } else {
        order.value = {
          customerId: parseInt(customerStore.customerId),
          discount: total_discount.value,
          total: totalAndDicount.value,
          recieved: recive_mon.value,
          change: change_money.value,
          payment: 'cash',
          orderItems: orderItemList.value
        }
      }
      
      const res = await orderService.saveOrder(order.value);
      orderStore.tempOrder = res.data;
      dialogComplteOrder.value = true;

      order.value = {
        customerId: 1,
        discount: 10,
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
  const selectCode = (idCode: number) => {
    const correctCode = promo.value.findIndex((code) => code.id === idCode);
    realCode.value = promo.value[correctCode].code;
    order.value.discount = promo.value[correctCode].price;
  };
  const checkCode = (Code: string) => {
    if(realCode.value === Code) {
      const res = total_discount.value = order.value.discount;
      console.log(res);
      dialogPromotion.value = false;
    }else {
      messageStore.showError("ไม่สามารถบันทึกข้อมูล Promotion ได้");
    }
  };

  return {
    total_,
    total_discount,
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
    openOrder,
    dialogComplteOrder,
    deleteAllOrder,
    promo,
    selectCode,
    checkCode
  }
})
