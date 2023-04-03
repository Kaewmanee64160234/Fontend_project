import type Check_Material from "@/store/types/checkmaterial";
import http from "./axios";

function getCheckMaterail() {
    return http.get("/check-material");
  }
  function saveCheckMaterail(check_materail: Check_Material) {
    return http.post("/check-material", check_materail);
}
  
function getOneCheckMaterail(id: string) {
    return http.get(`/check-material-detail/material/${id}`);
  }

function deleteCheckMaterial(id: string) {
    return http.delete(`/check-material/${id}`);
}
export default {getCheckMaterail, saveCheckMaterail , deleteCheckMaterial, getOneCheckMaterail}