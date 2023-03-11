import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductStore } from "./product.store";
import { usePointOfSale } from "./pointOfSell.store";


export const useCalculateStore = defineStore("calculate", () => {
    const pointofsaleStore = usePointOfSale();
    const total_ = ref(0);
    const total_dicount = ref(0);
    const totalAndDicount = ref(0);
    const recive_mon = ref(0);
    const change_money = ref(0);
    const CaltotalPrice = () => {
        if (pointofsaleStore.orderItemList.length > 0) {
            let cal = 0;
            for (let i = 0; i < pointofsaleStore.orderItemList.length; i++) {
                cal += pointofsaleStore.orderItemList[i].amount;
            }
            total_.value = cal;
        } else {
            total_.value = 0;
        }
    };
    const CalDiscout = (discout: number) => {
        total_dicount.value += discout;
      };
      const calMonAndDiscount = () => {
        if (total_.value > 0) {
          totalAndDicount.value = total_.value - total_dicount.value;
        }
    
        if (recive_mon.value > 0) {
          if (recive_mon.value - totalAndDicount.value >= 0) {
            change_money.value = recive_mon.value - totalAndDicount.value;
          } else {
            change_money.value = 0;
          }
        }
      };
      
    return {
        total_,
    total_dicount,
    CaltotalPrice,
    CalDiscout,
    recive_mon,
    totalAndDicount,
    change_money,
    calMonAndDiscount,
    }
});