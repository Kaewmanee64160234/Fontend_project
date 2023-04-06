
import type { Material } from "@/store/types/material.type";
import http from "./axios";

function getMaterials(params:any) {
    return http.get("/materials",{params:params});
  }
  function saveMaterial(material: Material) {
    return http.post("/materials", material);
}
  
function updateMaterial(id: number, material:Material) {
    return http.patch(`/materials/${id}`, material);
  }
  
function deleteMaterial(id: string) {
    return http.delete(`/materials/${id}`);
}
const findMatByName = (name: string) => {
  return http.get(`/materials/search/name/${name}`);
}
const viewMaterial = () => {
  return http.get(`/reports/material/view`);
}
export default {findMatByName,getMaterials, saveMaterial , updateMaterial , deleteMaterial,viewMaterial}