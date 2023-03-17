import { defineStore } from "pinia";
import type BILL_DETAIL from "./types/billdetail";
import { ref } from "vue";

export const useBillDetailStore = defineStore("billdetail", () => {
    const dialog = ref(false)
    const bill_detail = ref<BILL_DETAIL[]>([]);
    return { bill_detail,dialog};
  });