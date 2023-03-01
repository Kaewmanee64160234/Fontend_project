import { ref, computed } from "vue";
import { defineStore } from "pinia";
import auth from "@/services/auth";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {

  const authName = ref("");

  const login = async (email: string, password: string) => {
    try {
      const res = await auth.login(email, password);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (e) {
        console.log(e);
    }
    router.push("/");
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return { authName, login, logout };
});
