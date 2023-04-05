import { defineStore } from "pinia";
import { ref } from "vue";

export const useManageTime = defineStore("time", () => {
const month = ref(["January","February","March","April","May","June","July","August","September","October","November","December"]);


return {
    month
}
})