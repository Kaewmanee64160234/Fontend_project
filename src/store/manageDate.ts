import { defineStore } from "pinia";
import { ref } from "vue";

export const useManageTime = defineStore("time", () => {
const month = ref(["January","February","March","April","May","June","July","August","September","October","November","December"]);
const monthNum = ref(['01','02','03','04','05','06','07','08','09','10','11','12'])

return {
    month,
    monthNum
}
})