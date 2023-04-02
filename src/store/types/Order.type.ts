import type Customer from "./customer.type";
import type { OrderItem } from "./orderItem.type";

export interface Order{
    id?:number;
    customerId?: number;
    discount: number;
    total: number;
    recieved:number;
    change:number;
    payment:string;
    customer?:Customer;
    orderItems?:OrderItem[];
    createdDate?: Date
    updatedDate?: Date
    deletedDate?: Date

}