import type User from "@/store/types/user.type";
import http from "./axios";
function getUsers() {
  return http.get("/users");
}
const saveUser = (user:User) => {
  return http.post("/users", user)
}

const updateUser= (id:number, user:User) => {
  return http.patch("/users/" + id, user)
}

const deleteUser  = (id:number) => {
  return http.delete("/users/" + id)
}
const getUserByEmail = (email:string) => {
  return http.get(`/users/${email}`)
}
export default { getUsers ,saveUser, updateUser, deleteUser,getUserByEmail};