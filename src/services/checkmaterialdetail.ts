import type Check_Material_Detail from "@/store/types/checkmaterialdetail";
import http from "./axios";

function getCheckMaterailDetail() {
    return http.get("/check-material-detail");
  }
  function saveCheckMaterailDetail(check_materail_detail: Check_Material_Detail) {
    return http.post("/check-material-detail", check_materail_detail);
}
function getOneCheckMaterailDetail(id: string) {
    return http.get(`/check-material-detail${id}`);
  }
  
function deleteCheckMaterialDetail(id: string) {
    return http.delete(`/check-material-detail/${id}`);
}
export default {getCheckMaterailDetail, saveCheckMaterailDetail , deleteCheckMaterialDetail, getOneCheckMaterailDetail}