import type { Bill } from "./Bill.type"

export interface BillDetail {
  id?: number

  name?: string

  amount?: number

  price?: number

  total?: number

  bill?: Bill

  material?: Material

  createdAt?: Date

  updatedAt?: Date

  deletedAt?: Date
}
