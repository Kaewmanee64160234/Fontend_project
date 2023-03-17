import type Employee from "./employee.type";

export default interface User {
    id?: number;
    username: string;
    login: string;
    password: string;
    role: string;
<<<<<<< HEAD
    image?:string;
=======
    employee?: Employee;
>>>>>>> a25b000e6e155cba318a4cd5cf8918a8e103e739
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }