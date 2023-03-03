import type Employee from "@/store/types/employee.type";
import http from "./axios";

const getEmployees = ()=>{
    return http.get("/employees");
}
const createEmployee = (data:Employee & {files:File[]})=>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("address",data.address);
    formData.append("tel",data.tel);
    formData.append("email",data.email);
    formData.append("position",data.position);
    formData.append("hourly",data.hourly+'');
    
    formData.append("file",data.files[0]);
    return http.post("/employees",formData,{headers:{'Content-Type':'multipart/form-data'}});

}
const updateEmployee = async (id:string,data:Employee & {files:File[]})=>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("address",data.address);
    formData.append("tel",data.tel);
    formData.append("email",data.email);
    formData.append("position",data.position);
    formData.append("hourly",data.hourly+'');
    if(data.files){
        formData.append("file",data.files[0]);

    }
    return await http.patch(`/employees/${id}`,formData,{headers:{'Content-Type':'multipart/form-data'}});
}

const deleteEmployee = (id:string)=>{
    return http.delete(`/employees/${id}`);
}

export default {getEmployees,createEmployee,updateEmployee,deleteEmployee}
