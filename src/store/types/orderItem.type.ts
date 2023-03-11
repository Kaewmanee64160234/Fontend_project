<<<<<<< HEAD
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
=======
import type { Order } from './Order.type'
import type Product from './product.type'

export interface OrderItem {
  name: string
  amount: number
  productId: number
  total: number
  price: number
  order?: Order
  product?: Product // Product Id
  createdDate?: Date
  updatedDate?: Date
  deletedDate?: Date
}
>>>>>>> be863a19422f00edf5726438e0ad07ca6b3f9519
