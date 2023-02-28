import { defineStore } from "pinia";
import { ref } from "vue";
import customerService from "@/services/customer";
import type Customer from "./types/customer.type";
export const useCustomerStore = defineStore("customer", () => {
    const dialog = ref(false);
    const customers = ref<Customer[]>([]);
    const editCustomer = ref<Customer>({
        name: "",
        tel:"",
        point:0,
        image:"",
    })

    const getCustomers = async ()=>{
        try{
            const res = await customerService.getCustomers();
            customers.value = res.data;
        }catch(err){
            console.log(err);
        }
       
    }

    return {getCustomers,editCustomer,dialog,customers}
})