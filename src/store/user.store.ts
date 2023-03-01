import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type User from './types/user.type';
import axios from 'axios';
import userService from '@/services/user'
export const useUserStore = defineStore('User', () => {
  const dialog = ref(false);
  const users = ref<User[]>([]);
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const editedUser = ref<User>({username:"", login: "", password: "", role: "" });

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if(!newDialog){
      editedUser.value = {username:"", login: "", password: "", role: "" };
    }
  })
  async function getUsers() {
    try {
      const res = await userService.getUsers();
      users.value = res.data;
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  }
  const saveUser = async ()=>{
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
  }
  async function deleteUser(id:number){
    try{ 
        const res = await userService.deleteUser(id);
        await getUsers();
    }catch(e){
      console.log(e);
    }
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
