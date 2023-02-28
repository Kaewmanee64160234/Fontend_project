import { ref, computed } from "vue";
import { defineStore } from "pinia";
import auth from "@/services/auth";

import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  
  const authName = ref("");

  const isLogin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    }
    return false;
  };
  const login = async (username: string, password: string): Promise<void> => {

    try {
      const res = await auth.login(username, password);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.access_token);
      router.push("/");
    } catch (e) {
      console.log(e);
      
    }
    // localStorage.setItem("token", userName);
  };
  const logout = () => {
    // authName.value = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return { login, logout, isLogin };
});
