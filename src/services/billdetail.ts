import type BILL_DETAIL from "@/store/types/billdetail";
import http from "./axios";

function getBillDetail() {
    return http.get("/bill-detail");
  }
  function saveBillDetail(bill_detail: BILL_DETAIL) {
    return http.post("/bill-detail", bill_detail);
}
  
function updateBillDetail(id: string, bill_detail: BILL_DETAIL) {
    return http.patch(`/bill-detail/${id}`, bill_detail);
  }
  
function deleteBillDetail(id: string) {
    return http.delete(`/bill-detail/${id}`);
}
export default {getBillDetail, saveBillDetail , updateBillDetail , deleteBillDetail}