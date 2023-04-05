import type BILL from "@/store/types/bill";
import http from "./axios";

function getBill() {
    return http.get("/bills");
  }
function getOneBill( id:string ) {
    return http.get(`/bills/show/${id}`);
  }
function saveBill(bill: BILL) {
  return http.post("/bills", bill);
}
function updateBill(bill: BILL) {
    return http.patch("/bills/updated", bill);
  }
function deleteBill(id: string) {
    return http.delete(`/bills/${id}`);
}
export default {getBill, saveBill , updateBill, deleteBill, getOneBill}