
import type Catagory from "@/store/types/catagory";
import http from "./axios";
function getCatagories() {
  return http.get("/catagories");
}
const saveCatagory = (catagory:Catagory) => {
  return http.post("/catagories", catagory)
}

const updateCatagory= (id:number, catagory:Catagory) => {
  return http.patch("/catagories/" + id, catagory)
}

const deleteCatagory  = (id:number) => {
  return http.delete("/catagories/" + id)
}

export default { getCatagories ,saveCatagory, updateCatagory, deleteCatagory};