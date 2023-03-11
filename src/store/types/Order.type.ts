import type Customer from "./customer.type";
import type OrderItem from "./orderItem.type";
export default interface Order{
    id?: number;
    amount?: number;
    total?: number;
    customer?: Customer; // Customer Id
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    orderItems?: OrderItem[];

}