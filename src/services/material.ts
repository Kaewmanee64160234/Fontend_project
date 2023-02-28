
import type { Material } from "@/store/types/material.type";
import http from "./axios";

function getMaterial() {
    return http.get("/materials");
  }
  function saveMaterial(material: Material) {
    return http.post("/materials", material);
  }
  
  function updateMaterial(id: number,material: Material) {
    return http.patch(`/materials/${id}`, material);
  }
  
  function deleteMaterial(id: number) {
    return http.delete(`/materials/${id}`);
  }
export default {getMaterial,saveMaterial,updateMaterial,deleteMaterial}