import { defineStore } from "pinia";
import { ref } from "vue";
import type BILL from "./types/bill";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import { useEmployeeStore } from "./employee.store";
import { useMaterialStore } from '@/store/material.store.js';
import billServices from "@/services/bill";
import type BILL_DETAIL from "./types/billdetail";


export const useBillStore = defineStore("bill", () => {
  const dialog = ref(false)
  const materialStore = useMaterialStore();
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore();
  const bill = ref<BILL[]>([{ name: '', 
  date: new Date(), 
  total: 0 , 
  buy: 0, 
  change: 0 ,
  employeeId: 0,
  bill_detail: [{ id:0,name: '', amount: 0, price: 0, total:0, materialId:0, billId:0}]}]);
  const bill_Detail_List = ref<BILL_DETAIL[]>([{ id:0,name: '', amount: 0, price: 0, total:0, materialId:0, billId:0}]);
  const bill_list = ref<BILL>({ 
    name: '', 
    date: new Date(), 
    total: 0 , 
    buy: 0, 
    change: 0 ,
    employeeId: 0,
    bill_detail: bill_Detail_List.value
  });

  async function getBills() {
    loadingStore.isLoading = true
    try {
      const res = await billServices.getBill()
      bill_list.value = res.data
      console.log(bill_list.value)
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถดึงข้อมูล Bill ได้')
    }
    loadingStore.isLoading = false
  }

  async function saveBill() {
    loadingStore.isLoading = true
    try {
      for(let i = 0; i <= bill_Detail_List.value.length - 1; i++) {
        await billServices.saveBill(bill_list.value)
        const res =  await billServices.updateBill(bill_list.value)
        await getBills()
        await materialStore.getMaterials()
        console.log(res)
        } 
    }
    catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถบันทึกข้อมูล Bill ได้')
    }
    loadingStore.isLoading = false
  }
  const addBillDetail = () => {
      const newdetail = ref<BILL_DETAIL>({ id:0, name: '', amount: 0, price: 0, total: 0 });
      bill_Detail_List.value.push(newdetail.value);
    
    }
    const deleteBillDetail = (index: number) => {
      bill_Detail_List.value.splice(index, 1);
      // console.log(index);
    }
    const sumBill = () => {
      for(let i = 0; i < bill_Detail_List.value.length; i++) {
        bill_list.value.total = bill_list.value.bill_detail![i].total + bill_list.value.total;
        bill_list.value.change = bill_list.value.buy - bill_list.value.total;
      }
    }

    // const checkName = () => {
    //   loadingStore.isLoading = true
    //   try {
    //     for(let i = 0; i < bill_list.value.bill_detail!.length; i++) {
    //     if(materialStore.editedMaterial.name === bill_Dettail_List.value[i].name) {
    //       billServices.updatedBill(bill_list.value)
    //       console.log(bill_list.value)
    //     }
    //   }
    //   } catch (e) {
    //     console.log(e)
    //     messageStore.showError('ไม่สามารถบันทึกข้อมูลได้')
    //   }
    //   loadingStore.isLoading = false
    // }

    // const namebill = ref("")
    // const total_ = ref(0)
    // const totalAll = ref(0)
    // const buy_mon = ref(0)
    // const change_money = ref(0)
    // async function openBill() {
    //   loadingStore.isLoading = true
    //   try {
    //     if (bill_list.value.bill_detail?.length === 0 && bill_list.value.employeeId === 0) {
    //       messageStore.showError('ไม่สามารถบันทึกข้อมูล Orders ได้')
    //       loadingStore.isLoading = false
    //       namebill.value = " "
    //       total_.value = 0
    //       totalAll.value = 0
    //       buy_mon.value = 0
    //       change_money.value = 0
    //       return
    //     }
    //     else {
    //       bill_list.value = {
    //         name: '', 
    //         date: new Date(), 
    //         time:new Date(), 
    //         total: totalAll.value, 
    //         buy: buy_mon.value, 
    //         change: change_money.value,
    //         employeeId: parseInt(employeeStore.employeeId),
    //         bill_detail: bill_Dettail_List.value
    //       }
    //     }
    //     const res = await billServices.saveBill(bill_list.value)
    //     bill_Dettail_List.value = res.data
  
    //     bill_list.value = {
    //       name: '', 
    //         date: new Date(), 
    //         time:new Date(), 
    //         total: totalAll.value, 
    //         buy: buy_mon.value, 
    //         change: change_money.value,
    //         employeeId: parseInt(employeeStore.employeeId),
    //         bill_detail: bill_Dettail_List.value
    //     }
    //     namebill.value = " "
    //     total_.value = 0
    //     totalAll.value = 0
    //     buy_mon.value = 0
    //     change_money.value = 0
    //   } catch (e) {
    //     console.log(e)
    //     messageStore.showError('ไม่สามารถบันทึกข้อมูล Bill ได้')
    //   }
    //   loadingStore.isLoading = false
    // }
    return { bill,getBills,saveBill,bill_list,dialog,messageStore,loadingStore,addBillDetail,deleteBillDetail,bill_Detail_List,sumBill};  
  });