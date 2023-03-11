import { defineStore } from "pinia";
import { ref } from "vue";
import type { Order } from "@/store/types/Order.type";
import orderService from '@/services/order'

export const useOrderStore = defineStore("order", () => {
    const orders = ref<Order[]>([]);
    const getOrders = async () => {
        const response = await orderService.getOrders();
        orders.value = response.data;
    }
    return {getOrders,orders}
});