import type Employee from "./employee.type";

export default interface User {
    id?: number;
    username: string;
    login: string;
    password: string;
    fullTime?: false;
    salary:number;
    role: string;
    telEmployee?:string;
    addressEmployee?: string;
    address?:string;
    hourly?:number;
    image?:string;
    employee?: Employee;
    name_employee?:string;
    tel:string;
    position?:string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }