import type Store from "@/store/types/store.type";
import http from "./axios";
function getReport() {
  return http.get("/reports/graph");
}

export default { getReport };