import type Customer from "@/store/types/customer.type";
import http from "./axios";

const getCustomers = ()=>{
    return http.get("/customers");
}
const createCustomer = (data:Customer & {files:File[]})=>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("point",data.point+'');
    formData.append("tel",data.tel);
    formData.append("file",data.files[0]);
    return http.post("/customers",formData,{headers:{'Content-Type':'multipart/form-data'}});

}

export default {getCustomers,createCustomer}