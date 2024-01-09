import type { Topping } from "@/store/types/topping";
import http from "./axios";

function getToppings(params: any) {

        return http.get("/toppings",{params: params});
      }
      const saveTopping = (toping:Topping) => {
        return http.post("/toppings", toping)
      }
      
      const updateTopping= (id:number, toping:Topping) => {
        return http.patch("/toppings/" + id, toping)
      }
      
      const deleteTopping  = (id:number) => {
        return http.delete("/toppings/" + id)
      }
      export default { getToppings ,saveTopping, updateTopping, deleteTopping};

    