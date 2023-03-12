import type { OrderItem } from "./orderItem.type";

export interface Order{
    id?:number;
    customerId?: number;
    discount: number;
    total: number;
    recieved:number;
    change:number;
    payment:string;
    orderItems?:OrderItem[];
    createdDate?: Date
    updatedDate?: Date
    deletedDate?: Date

}