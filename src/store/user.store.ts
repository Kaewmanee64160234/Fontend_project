import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type User from './types/user.type';
import axios from 'axios';
import userService from '@/services/user'
import { useLoadingStore } from '@/store/loading';
export const useUserStore = defineStore('User', () => {
  const dialog = ref(false);
  const users = ref<User[]>([]);
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const loadingStore = useLoadingStore();
  const editedUser = ref<User>({username:"", login: "", password: "", role: "" });

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if(!newDialog){
      editedUser.value = {username:"", login: "", password: "", role: "" };
    }
  })
  async function getUsers() {
    loadingStore.isLoading = true;
    try {
      const res = await userService.getUsers();
      users.value = res.data;
      console.log(res)
    } catch (e) {
      console.log(e);
    }
    loadingStore.isLoading = false;
  }
  const saveUser = async ()=>{
    loadingStore.isLoading = true;
    try{
      if(editedUser.value.id){
        const res = await userService.updateUser(editedUser.value.id, editedUser.value);

      }else{
        const res = await userService.saveUser(editedUser.value);
      }
      dialog.value = false;
      await getUsers();
    }catch(e){
      console.log(e);
    }
    loadingStore.isLoading = false;
  }
  async function deleteUser(id:number){
    loadingStore.isLoading = true;
    try{ 
        const res = await userService.deleteUser(id);
        await getUsers();
    }catch(e){
      console.log(e);
    }
    loadingStore.isLoading = false;
  }
  function editUser(user:User){
    editedUser.value = JSON.parse(JSON.stringify(user));
    dialog.value = true;
  }
  
  function selectUserAll() {
    if (!allSelected.value) {
      selected.value = users.value.map((user) => user.id + '')
    }
  }
  function selectUser()  {
    allSelected.value = false
  }
  const deleteAllUser = async () => {
    for (let i = 0; i < selected.value.length; i++) {
      await userService.deleteUser(selected.value[i])
      await getUsers()
    }
  }


  return { users, getUsers, dialog, saveUser, deleteUser, editUser, editedUser, selectUserAll, selectUser, allSelected, selected, deleteAllUser }
})
