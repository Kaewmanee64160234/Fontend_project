import type User from "@/store/types/user.type";
import http from "./axios";
function getUsers(params: any) {
  return http.get("/users",{params: params});
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

const findUserByName = (name:string) => {
  return http.get(`/users/search/name/${name}`)
}
const confirmWithPassword = (user:User)=>{
  return http.post(`/users/confirm`)
}
export default {confirmWithPassword, findUserByName,getUsers ,saveUser, updateUser, deleteUser,getUserByEmail};