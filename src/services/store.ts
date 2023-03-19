import type Store from "@/store/types/store.type";
import http from "./axios";
function getStores(params: any) {
  return http.get("/stores",{params: params});
}
const saveStore = (store:Store) => {
  return http.post("/stores", store)
}

const updateStore= (id:number, store:Store) => {
  return http.patch("/stores/" + id, store)
}

const deleteStore  = (id:number) => {
  return http.delete("/stores/" + id)
}
export default { getStores ,saveStore, updateStore, deleteStore};