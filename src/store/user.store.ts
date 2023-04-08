import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type User from './types/user.type'
import axios from 'axios'
import userService from '@/services/user'
import { useLoadingStore } from '@/store/loading'
import { useMessageStore } from './message'

export const useUserStore = defineStore('User', () => {
  const messageStore = useMessageStore()
  const dialog = ref(false)
  const users = ref<User[]>([])
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const loadingStore = useLoadingStore()
  const search = ref('')
  const editedUser = ref<User & { files: File[] }>({ username: '', login: '', password: '', role: '', fullTime: false, salary: 0,  files: [] ,tel:''})
  const loaded = ref(false)
  const loading = ref(false)
  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog)
    if (!newDialog) {
      editedUser.value = { username: '', login: '', password: '', role: '', fullTime: false, salary: 0,  files: [] ,tel:''}
    }
  })

  // about pagination
  const page = ref(1)
  const take = ref(5)
  const keyword = ref('')
  const order = ref('ASC')
  const orderBy = ref('')
  const lastPage = ref(0)

  watch(page, async (newPage, oldPage) => {
    await getUsers()
  })
  watch(keyword, async (newKey, oldKey) => {
    await getUsers()
  })
  watch(lastPage, async (newlastPage, oldlastPage) => {
    if (newlastPage < page.value) {
      page.value = 1
    }
  })

  async function getUsers() {
    loadingStore.isLoading = true
    try {
      const res = await userService.getUsers({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
        order: order.value,
        orderBy: orderBy.value
      })
      users.value = res.data.data
      lastPage.value = res.data.lastPage
    } catch (e) {
      console.log(e)
      messageStore.showError('Oops!, cannot get users.')
    }
    loadingStore.isLoading = false
  }
  const saveUser = async () => {
    loadingStore.isLoading = true
    try {
      if (editedUser.value.id) {
        editedUser.value.name_employee = editedUser.value.username;
        editedUser.value.tel  = editedUser.value.telEmployee+'';

        editedUser.value.address = editedUser.value.addressEmployee+'';
        console.log(editedUser.value)
        const res = await userService.updateUser(editedUser.value.id, editedUser.value)
      } else {
        editedUser.value.address = editedUser.value.addressEmployee+'';

        editedUser.value.name_employee = editedUser.value.username;
        editedUser.value.tel  = editedUser.value.telEmployee+'';

        const res = await userService.saveUser(editedUser.value)
      }
      dialog.value = false
      await getUsers()
    } catch (e) {
      console.log(e)
      messageStore.showError('Cannot save user.')
    }
    loadingStore.isLoading = false
  }
  async function deleteUser(id: number) {
    loadingStore.isLoading = true
    try {
      const res = await userService.deleteUser(id)
      await getUsers()
    } catch (e) {
      console.log(e)
      messageStore.showError('Cannot delete user')
    }
    loadingStore.isLoading = false
  }
  function editUser(user: User) {
    editedUser.value = JSON.parse(JSON.stringify(user))
    dialog.value = true
  }
  function selectUserAll() {
    if (!allSelected.value) {
      selected.value = users.value.map((user) => user.id + '')
    }
  }
  function selectUser() {
    allSelected.value = false
  }
  const deleteAllUser = async () => {
    for (let i = 0; i < selected.value.length; i++) {
      await userService.deleteUser(selected.value[i])
    }
    await getUsers()
  }
  const getUserByEmail = async (email: string) => {
    const data = await userService.getUserByEmail(email)
    users.value = data.data
  }
  const getUserByUsername = async () => {
    try {
      if (search.value !== '') {
        const res = await userService.findUserByName(search.value)

        setTimeout(() => {
          loading.value = false
          loaded.value = true
        }, 2000)
        users.value = res.data
        console.log(users.value)
      } else {
        await getUsers()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    page,
    keyword,
    take,
    order,
    orderBy,
    lastPage,
    loading,
    loaded,
    getUserByUsername,
    getUserByEmail,
    users,
    getUsers,
    dialog,
    saveUser,
    deleteUser,
    editUser,
    editedUser,
    selectUserAll,
    selectUser,
    allSelected,
    selected,
    deleteAllUser,
    search
  }
})