
import http from "./axios";
import type Employee from "@/store/types/employee.type";
import type { CheckInOut } from "@/store/types/CheckInOut";

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

const employeeLogin = (name:string,email:string)=>{
    return http.post("/employees/login",{name,email});
}

const employeeCheckIn = (checkInCheckOut:CheckInOut)=>{
    return http.post("/check-in-outs",checkInCheckOut);
}

const employeeCheckOut = (id:number)=>{
    return http.patch("/check-out-outs/"+id);
}

const getOneEmployee = (id:string)=>{
    http.get(`/employees/${id}`);
}

export default {getOneEmployee,employeeCheckOut,employeeCheckIn,getEmployees,createEmployee,updateEmployee,deleteEmployee,employeeLogin}
