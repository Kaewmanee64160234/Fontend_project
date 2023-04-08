import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import auth from '@/services/auth'
import router from '@/router'
import { useLoadingStore } from './loading'
import { useMessageStore } from './message'
import type User from './types/user.type'
export const useAuthStore = defineStore('auth', () => {
  const authName = ref({})
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore()
  
// const getUser = () => {
//   const userString = localStorage.getItem('user');
//   if (!userString) return null;
//   const user = JSON.parse(userString ?? "");
//   //*
//   console.log(user)
// }

  const login = async (email: string, password: string) => {
    loadingStore.isLoading = true
    try {
      const res = await auth.login(email, password)
      console.log(res.data)  
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('employee', JSON.stringify(res.data.user.employee))
      console.log(res.data.user.employee)
      authName.value = JSON.parse(JSON.stringify(localStorage.getItem('user')))
    } catch (e) {
      console.log(e)
      messageStore.showError('Username or Password is incorrect')
    }
    loadingStore.isLoading = false
    router.push('/')
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('employee')
    authName.value = ''
    router.replace('/login')
  }


  return { login, logout, authName,}
})
