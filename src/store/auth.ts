import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import auth from '@/services/auth'
import router from '@/router'
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useAuthStore = defineStore('auth', () => {
  const authName = ref({})
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const login = async (email: string, password: string) => {
    loadingStore.isLoading = true;
    try {
      const res = await auth.login(email, password)
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      authName.value = JSON.parse(JSON.stringify(localStorage.getItem('user')))
    } catch (e) {
      console.log(e)
      messageStore.showError("Username หรือ Password ไม่ถูกต้อง");
    }
    loadingStore.isLoading = false;
    router.push('/')
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    authName.value = ''
    router.replace('/login')
  }

  return { login, logout ,authName}
})
