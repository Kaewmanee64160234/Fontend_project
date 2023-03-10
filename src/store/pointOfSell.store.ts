import { defineStore } from "pinia";
import { ref } from "vue";

export const usePointOfSale = defineStore('point of sale', () => {
    const dialog = ref(false);

    return {dialog}

});