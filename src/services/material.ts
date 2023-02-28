
import http from "./axios";

function getMaterial() {
    return http.get("/materials");
  }

export default {getMaterial}