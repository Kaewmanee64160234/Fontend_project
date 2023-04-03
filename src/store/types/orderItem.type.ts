import type Product from './product.type'

export interface OrderItem {
  name: string
  amount: number
  productId: number
  total: number
  price: number
  createdDate?: Date
  updatedDate?: Date
  deletedDate?: Date
  image?: string
}

