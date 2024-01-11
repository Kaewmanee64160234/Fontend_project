import type DetailProduct from './detailProducr'
import type Product from './product.type'
import type { Topping } from './topping'

export interface OrderItem {
  name: string
  amount: number
  productId: number
  total: number
  price: number
  detail?:string
  toppings:Topping[]
  sweet?:string,
  size?:string,
  categoryId?:number,
  createdDate?: Date
  updatedDate?: Date
  deletedDate?: Date
  image?: string;

}

