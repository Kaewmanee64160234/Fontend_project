
import http from "./axios";
import type Employee from "@/store/types/employee.type";
import type { CheckInOut } from "@/store/types/CheckInOut";
import type { SummarySalary } from "@/store/types/SummarySalary.type";

const getEmployees = (params:any)=>{
    return http.get("/employees",{params:params});
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

const employeeCheckOut = (id:string)=>{
    return http.patch("/check-in-outs/"+id);
}


const getOneEmployee = (id:string)=>{
   return http.get(`/employees/${id}`);
}

const getSummaryByEmployeeId = (id:string)=>{
    return http.get(`/summary-salary/employee/${id}`);
}

const getAllSummarySalary = (params:any)=>{
    return http.get("/summary-salary",{params:params});
}
const getAllCheckInOut = ()=>{
    return http.get("/check-in-outs");
}
const findEmployeeByName = (name:string)=>{
    return http.get(`/employees/search/name/${name}`);
}
 
const getCioByIdEmp = (params:any)=>{
    return http.get(`/employees/cio/employee`,{params:params});
}
const getSummarySalaryById = (id:string)=>{ 
    return http.get(`/summary-salary/${id}`);
}
const updateSummarySalary = (id:string,data:SummarySalary)=>{
    return http.patch(`/summary-salary/${id}`,data);
}

export default {updateSummarySalary,getSummarySalaryById,getCioByIdEmp,getAllCheckInOut,getAllSummarySalary,getSummaryByEmployeeId,getOneEmployee,employeeCheckOut,employeeCheckIn,getEmployees,createEmployee,updateEmployee,deleteEmployee,employeeLogin,findEmployeeByName }

