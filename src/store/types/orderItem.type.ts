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
