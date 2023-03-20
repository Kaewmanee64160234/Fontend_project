import type BILL from "@/store/types/bill";
import http from "./axios";

function getBill() {
    return http.get("/bills");
  }

function getOneBill(id: string) {
  return http.get(`/bills/${id}`);
  }
function saveBill(bill: BILL) {
  return http.post("/bills", bill);
}
function updateBill(id: string, bill: BILL) {
    return http.patch(`/bills/${id}`, bill);
  }
  
function deleteBill(id: string) {
    return http.delete(`/bills/${id}`);
}
export default {getBill, saveBill , updateBill, deleteBill, getOneBill}