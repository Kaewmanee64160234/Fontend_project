import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type User from './types/user.type';
import axios from 'axios';
import userService from '@/services/user'
import { useLoadingStore } from '@/store/loading';
import { useMessageStore } from './message';

export const useUserStore = defineStore('User', () => {
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const users = ref<User[]>([]);
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const loadingStore = useLoadingStore();
  const search = ref('');

  const editedUser = ref<User & { files: File[] }>({
    username: '',
    login: '',
    password: '',
    role: '',
    image: 'no_image.jpg',
    files: []
  })

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if(!newDialog){
      editedUser.value = { 
      username: '',
      login: '',
      password: '',
      role: '',
      image: 'no_image.jpg',
      files: []};
    }
  })
  async function getUsers() {
    loadingStore.isLoading = true;
    try {
      const res = await userService.getUsers();
      users.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Users ได้");
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
      messageStore.showError("ไม่สามารถบันทึกข้อมูล Users ได้");
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
      messageStore.showError("ไม่สามารถลบข้อมูล Users ได้");
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
    }
    await getUsers()
  }
  const getUserBtEmail = async(email:string)=>{
    const data = await userService.getUserByEmail(email);
  }


  return { users, getUsers, dialog, saveUser, deleteUser, editUser, editedUser, selectUserAll, selectUser, allSelected, selected, deleteAllUser, search }
})
