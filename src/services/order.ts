import type { Order } from "@/store/types/Order.type";
import http from "./axios";
function getOrders(params:any) {
  return http.get("/orders",{params:params});
}

function getOneOrder(id: string) {
  return http.get(`/orders/${id}`);
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
export default {getOneOrder, getOrders ,saveOrder, updateOrder, deleteOrder};