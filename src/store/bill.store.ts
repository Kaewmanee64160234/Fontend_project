import { defineStore } from "pinia";
import { ref } from "vue";
import type BILL from "./types/bill";

export const useBillStore = defineStore("bill", () => {
    const bill = ref<BILL[]>([]);
    return { bill};  
  });