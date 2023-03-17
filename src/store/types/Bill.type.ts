import type { BillDetail } from "./BillDetail.type";
import type Employee from "./employee.type";

export interface Bill {
    id?: number;
  
    name?: string;
  
    date?: Date;
  
    time?: Date;
  
    total?: number;
  
    buy?: number;
  
    change?: string;
  
    employee?: Employee;
  
    bill_detail?: BillDetail[];
  
    createdAt?: Date;
  
    updatedAt?: Date;
  
    deletedAt?: Date;

}