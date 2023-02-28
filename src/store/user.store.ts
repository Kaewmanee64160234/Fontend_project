import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type User from './types/user.type';
import axios from 'axios';
import userService from '@/services/user'
export const useUserStore = defineStore('User', () => {
  const dialog = ref(false);
  const users = ref<User[]>([]);
  async function getUsers() {
    try {
      const res = await userService.getUsers();
      users.value = res.data;
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  }
  return { users, getUsers, dialog }
})
