
import type { Material } from "@/store/types/material.type";
import http from "./axios";

function getMaterials() {
    return http.get("/materials");
  }
  function saveMaterial(material: Material) {
    const formData = new FormData();
    formData.append("name", material.name);
    formData.append("minquantity", `${material.minquantity}`);
    formData.append("quantity", `${material.quantity}`);
    formData.append("unit", `${material.unit}`);
    formData.append("price_per_unit", `${material.price_per_unit}`);
    return http.post("/materials", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}
  
function updateMaterial(id: number, material:Material) {
    return http.patch(`/materials/${id}`, material);
  }
  
function deleteMaterial(id: string) {
    return http.delete(`/materials/${id}`);
}
export default {getMaterials, saveMaterial , updateMaterial , deleteMaterial}