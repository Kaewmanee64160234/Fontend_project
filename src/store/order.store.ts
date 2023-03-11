import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useLoadingStore } from '@/store/loading';
import { useMessageStore } from './message';
import type Order from './types/order.type';
import orderService from '@/services/order'
import type Product from './types/product.type';
import { usePointOfSale } from './pointOfSell.store';
import order from '@/services/order';

export const useOrderStore = defineStore('Order', () => {
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const orders = ref<Order[]>([]);
  const loadingStore = useLoadingStore();
  const editedOrder = ref<Order>({});
  const pointOfSaleStore = usePointOfSale()


  const orderList = ref<{ product: Product; amount: number; sum: number }[]>([]);
  function addToCart(item: Product) {
    pointOfSaleStore.updatetmpProduct(item)
    pointOfSaleStore.dialogTopping = true;
    for (let i = 0; i < orderList.value.length; i++) {
      if (orderList.value[i].product.id === item.id) {
        orderList.value[i].amount++;
        orderList.value[i].sum = orderList.value[i].amount * item.price;
        return;
      }
    }
    orderList.value.push({ product: item, amount: 1, sum: 1 * item.price });
  }
  function deleteOrderitem(index: number) {
    orderList.value.splice(index, 1);
  }

  const sumAmount = computed(() => {
    let sum = 0;
    for (let i = 0; i < orderList.value.length; i++) {
      sum = sum + orderList.value[i].amount;
    }
    return sum;
  })

  const sumPrice = computed(() => {
    let sum = 0;
    for (let i = 0; i < orderList.value.length; i++) {
      sum = sum + orderList.value[i].sum;
    }
    return sum;
  })


  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      editedOrder.value = {};
    }
  })
  async function getOrders() {
    loadingStore.isLoading = true;
    try {
      const res = await orderService.getOrders();
      orders.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Orders ได้");
    }
    loadingStore.isLoading = false;
  }
  async function openOrder() {
    // const orderItems = orderList.value.map(item) => 
    // <{ productId: number; amount: number}> {
    //   productId = item.product.id,
    //   amount = item.amount,}
    // };
    loadingStore.isLoading = true;
    try {
      const res = await orderService.saveOrder(editedOrder.value);

      dialog.value = false;
      await getOrders();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึกข้อมูล Orders ได้");
    }
    loadingStore.isLoading = false;
  }
  async function deleteOrder(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await orderService.deleteOrder(id);
      await getOrders();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบข้อมูล Orders ได้");
    }
    loadingStore.isLoading = false;
  }
  function editOrder(order: Order) {
    editedOrder.value = JSON.parse(JSON.stringify(order));
    dialog.value = true;
  }



  return { 
    orders, 
    getOrders, 
    dialog,
    openOrder, 
    deleteOrder, 
    editOrder, 
    editedOrder, 
    addToCart, 
    deleteOrderitem, 
    sumAmount, 
    sumPrice, 
    orderList }
})
