import { defineStore } from "pinia";
import { ref } from "vue";

export const usePointOfSale = defineStore('point of sale', () => {
    const dialogPayment = ref(false);
    const dialogPrompypay = ref(false);
    const dialogPromotion = ref(false);
    const order = ref([])



    return {dialogPayment, dialogPromotion,dialogPrompypay}


});