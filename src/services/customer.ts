import type Customer from "@/store/types/customer.type";
import http from "./axios";

const getCustomers = (params:any)=>{
    return http.get("/customers",{params:params});
}
const createCustomer = (data:Customer)=>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("point",data.point+'');
    formData.append("tel",data.tel);
    // formData.append("file",data.files[0]);
    return http.post("/customers",formData,{headers:{'Content-Type':'multipart/form-data'}});

}
const updateCustomer = async (id:string,data:Customer )=>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("point",data.point+'');
    formData.append("tel",data.tel);
    // if(data.files){
    //     formData.append("file",data.files[0]);

    // }
    return await http.patch(`/customers/${id}`,formData,{headers:{'Content-Type':'multipart/form-data'}});
}

const deleteCustomer = (id:string)=>{
    return http.delete(`/customers/${id}`);
}

const findCustomerBytel = (tel:string)=>{
    return http.get(`/customers/search/tel/${tel}`);
}


export default {findCustomerBytel,getCustomers,createCustomer,updateCustomer,deleteCustomer}