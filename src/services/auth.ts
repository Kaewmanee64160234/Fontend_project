
import http from "./axios";
function login(login: string, password: string) {
  return http.post("/auth/login", { login, password });
}

export default { login };
