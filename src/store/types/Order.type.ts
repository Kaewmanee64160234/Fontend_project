import type { OrderItem } from "./orderItem.type";

export interface Order{
    customerId: string;
    discount: number;
    total: number;
    recieved:number;
    change:number;
    payment:string;
    orderItems:OrderItem[];

}