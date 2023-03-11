
import type { Order } from "@/store/types/order.type";
import http from "./axios";
function getOrders() {
  return http.get("/orders");
}
function saveOrder (order: Order) {
  return http.post("/orders", order)
}

function updateOrder (id:number, order:Order) {
  return http.patch("/orders/" + id, order)
}

function deleteOrder  (id:number){
  return http.delete("/orders/" + id)
}
export default { getOrders ,saveOrder, updateOrder, deleteOrder};