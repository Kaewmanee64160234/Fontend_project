
import type { Order } from "@/store/types/Order.type";
import http from "./axios";
function getOrders() {
  return http.get("/orders");
}
const saveOrder = (order:Order) => {
  return http.post("/orders", order)
}

const getOneOrder = (id:string) => {
  return http.get(`/orders/${id}`);
}

const updateOrder= (id:number, order:Order) => {
  return http.patch("/orders/" + id, order)
}

const deleteOrder  = (id:number) => {
  return http.delete("/orders/" + id)
}
export default { getOneOrder,getOrders ,saveOrder, updateOrder, deleteOrder};