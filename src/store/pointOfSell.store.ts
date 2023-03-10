import { defineStore } from "pinia";
import { ref } from "vue";

export const usePointOfSale = defineStore('point of sale', () => {
    const dialogPayment = ref(false);
    const dialogPrompypay = ref(false);

    return {dialogPayment,dialogPrompypay}

});