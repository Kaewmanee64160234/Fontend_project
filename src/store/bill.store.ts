import { defineStore } from "pinia";
import { ref } from "vue";
import type BILL from "./types/bill";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import { useEmployeeStore } from "./employee.store";
import billServices from "@/services/bill";
import type BILL_DETAIL from "./types/billdetail";


export const useBillStore = defineStore("bill", () => {
  const dialog = ref(false)
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore();
  const employeeStore = useEmployeeStore();
  const bill = ref<BILL[]>([]);
  const bill_Dettail_List = ref<BILL_DETAIL[]>([{ id:0,name: '', amount: 0, price: 0, total:0 }]);
  const bill_list = ref<BILL>({ 
    name: '', 
    date: new Date(), 
    time:new Date(), 
    total: 0 , 
    buy: 0, 
    change: 0 ,
    employeeId: 0,
    bill_detail: bill_Dettail_List.value
  });

  async function getBills() {
    loadingStore.isLoading = true
    try {
      const res = await billServices.getBill()
      bill.value = res.data
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถดึงข้อมูล Bill ได้')
    }
    loadingStore.isLoading = false
  }

  async function saveBill() {
    loadingStore.isLoading = true
    try {
      if (bill_list.value.bill_detail!) {
        console.log(bill_list.value)
        await billServices.updateBill(bill_list.value.id+'', bill_list.value)
      } else {
        console.log(bill_list.value)
        const res = await billServices.saveBill(bill_list.value)
        console.log(res.data);
      }
      await getBills()
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถบันทึกข้อมูล Bill ได้')
    }
    loadingStore.isLoading = false
  }
  const addBillDetail = () => {
      const newdetail = ref<BILL_DETAIL>({ id:0, name: '', amount: 0, price: 0, total: 0 });
      bill_Dettail_List.value.push(newdetail.value);
    
    }
    const deleteBillDetail = (index: number) => {
      bill_Dettail_List.value.splice(index, 1);
      // console.log(index);
    }
    const sumBill = () => {
      bill_list.value.buy = bill_Dettail_List.value[0].price * bill_Dettail_List.value[0].amount
      bill_list.value.total = bill_list.value.buy - bill_list.value.change;

    }
    const namebill = ref("")
    const total_ = ref(0)
    const totalAll = ref(0)
    const buy_mon = ref(0)
    const change_money = ref(0)
    async function openBill() {
      loadingStore.isLoading = true
      try {
        if (bill_list.value.bill_detail?.length === 0 && bill_list.value.employeeId === 0) {
          messageStore.showError('ไม่สามารถบันทึกข้อมูล Orders ได้')
          loadingStore.isLoading = false
          namebill.value = " "
          total_.value = 0
          totalAll.value = 0
          buy_mon.value = 0
          change_money.value = 0
          return
        }
        else {
          bill_list.value = {
            name: '', 
            date: new Date(), 
            time:new Date(), 
            total: totalAll.value, 
            buy: buy_mon.value, 
            change: change_money.value,
            employeeId: parseInt(employeeStore.employeeId),
            bill_detail: bill_Dettail_List.value
          }
        }
        const res = await billServices.saveBill(bill_list.value)
        bill_Dettail_List.value = res.data
  
        bill_list.value = {
          name: '', 
            date: new Date(), 
            time:new Date(), 
            total: totalAll.value, 
            buy: buy_mon.value, 
            change: change_money.value,
            employeeId: parseInt(employeeStore.employeeId),
            bill_detail: bill_Dettail_List.value
        }
        namebill.value = " "
        total_.value = 0
        totalAll.value = 0
        buy_mon.value = 0
        change_money.value = 0
      } catch (e) {
        console.log(e)
        messageStore.showError('ไม่สามารถบันทึกข้อมูล Bill ได้')
      }
      loadingStore.isLoading = false
  
    }
    return { bill,getBills,saveBill,bill_list,dialog,messageStore,loadingStore,addBillDetail,deleteBillDetail,bill_Dettail_List,sumBill,openBill};  
  });