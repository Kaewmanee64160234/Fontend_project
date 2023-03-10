import { defineStore } from "pinia";
import { ref } from "vue";
import type { Order } from "./types/Order.type";
import type { OrderItem } from "./types/orderItem.type";

export const usePointOfSale = defineStore('point of sale', () => {
    const dialogPayment = ref(false);
    const dialogPrompypay = ref(false);
    const dialogPromotion = ref(false);
    const orderItemList = ref<OrderItem[]>([]);
    const dialogTopping = ref(false);
    const order = ref<Order>({
        customerId:'',
        discount: 0,
        total: 0,
        recieved: 0,
        change:0,
        payment:'',
        orderItems:orderItemList.value


    });

    const addToOrder = (orderItem: OrderItem) => {
        orderItemList.value.push(orderItem);
    }



    return {dialogTopping,dialogPayment, dialogPromotion,dialogPrompypay,orderItemList,addToOrder,order}


});