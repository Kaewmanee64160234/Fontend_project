import { defineStore } from "pinia";
import { ref, watch } from "vue";
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
  const bill_detail = ref<BILL_DETAIL[]>([]);
  const bill_list = ref<BILL>({ 
    name: '', 
    date: new Date(), 
    total: 0 , 
    buy: 0, 
    change: 0 ,
    employeeId: 0,
    bill_detail: bill_Detail_List.value
  });

    // about pagination
    const page = ref(1)
    const take = ref(5)
    const keyword = ref('')
    const order = ref('ASC')
    const orderBy = ref('')
    const lastPage = ref(0)
  
    watch(page, async (newPage, oldPage) => {
      await getOneBill(keyword.value)
    })
    watch(keyword, async (newKey, oldKey) => {
      if(keyword.value.length >=3){
        await getOneBill(keyword.value)
      }if(keyword.value.length ===0){
        await getOneBill(keyword.value)
    
      }
    })
    watch(lastPage, async (newlastPage, oldlastPage) => {
      if (newlastPage < page.value) {
        page.value = 1
      }
    })

  async function getBills() {
    loadingStore.isLoading = true
    try {
      const res = await billServices.getBill()
      bill.value = res.data
      console.log(bill.value)
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
    const getOneBill = async (id: string) => {
      loadingStore.isLoading = true
      try {
        const res = await billServices.getOneBill(id);
        console.log(res.data)
        bill_detail.value = res.data
        console.log( bill_detail.value)
      } catch (err) {
        console.log(err)
        messageStore.showError("ไม่สามารถดึงข้อมูล Bill ได้");
  
      }
  
      loadingStore.isLoading = false
    }
    return { bill,getBills,saveBill,bill_list,dialog,messageStore,loadingStore,addBillDetail,deleteBillDetail,bill_Detail_List,sumBill,getOneBill,page,keyword,take,order,orderBy,lastPage,bill_detail};  
  });