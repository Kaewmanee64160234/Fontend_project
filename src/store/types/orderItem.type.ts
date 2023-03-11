import type Order from "./order.type";
import type Product from "./product.type";

export default interface OrderItem{
    name?:string;
    price?: number;
    amount?:number;
    total?: number;
    order?: Order;
    product: Product;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}