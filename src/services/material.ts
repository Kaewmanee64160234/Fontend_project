
import type { Material } from "@/store/types/material.type";
import http from "./axios";

function getMaterials() {
    return http.get("/materials");
  }
function saveMaterial(material: Material) {
    return http.post("/materials",material);
}
  
function updateMaterial(id: number, material:Material) {
    return http.patch(`/materials/${id}`, material);
  }
  
function deleteMaterial(id: string) {
    return http.delete(`/materials/${id}`);
}
export default {getMaterials, saveMaterial , updateMaterial , deleteMaterial}