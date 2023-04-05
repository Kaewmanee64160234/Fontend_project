import type Employee from "./employee.type";

export default interface User {
    id?: number;
    username: string;
    login: string;
    password: string;
    role: string;
    image?:string;
    employee?: Employee;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }