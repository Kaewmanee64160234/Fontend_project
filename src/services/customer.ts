import http from "./axios";

const getCustomers = ()=>{
    return http.get("/customers");
}

export default {getCustomers}