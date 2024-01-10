import { defineStore } from 'pinia'
import type { Topping } from './types/topping'
import { ref, watch } from 'vue'
import { useLoadingStore } from './loading'
import useToppingService from '../services/topping'
import { useMessageStore } from './message'

export const useToppingStore = defineStore('Topping', () => {
  const toppings = ref<Topping[]>([])
  const selectedToppings = ref<Topping[]>([])
  const editedTopping = ref<Topping>({ category: { name: '' }, name: '', price: 0 })
  const loadingStore = useLoadingStore()
  const search = ref('')
  const dialog = ref(false)
  const loaded = ref(false)
  const loading = ref(false)
  const messageStore = useMessageStore()
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog)
    if (!newDialog) {
      editedTopping.value = { category: { name: '' }, name: '', price: 0 }
    }
  })

  // about pagination
  const page = ref(1)
  const take = ref(5)
  const keyword = ref('')
  const order = ref('ASC')
  const orderBy = ref('')
  const lastPage = ref(0)
  const cat = ref('')

  watch(page, async (newPage, oldPage) => {
    await getToppings()
  })
  watch(keyword, async (newKey, oldKey) => {
    if (keyword.value.length >= 3) {
      await getToppings()
    }
    if (keyword.value.length === 0) {
      await getToppings()
    }
  })
  watch(lastPage, async (newlastPage, oldlastPage) => {
    if (newlastPage < page.value) {
      page.value = 1
    }
  })

  async function getToppings() {
    loadingStore.isLoading = true
    try {
      const res = await useToppingService.getToppings({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
        order: order.value,
        orderBy: orderBy.value
      })
      lastPage.value = res.data.lastPage
      toppings.value = res.data.data
      console.log(toppings.value);
    } catch (e) {
      console.log(e)
      messageStore.showError('Oops!, cannot get toppings.')
    }
    loadingStore.isLoading = false
  }
  const saveTopping = async () => {
    loadingStore.isLoading = true
    try {
      if (editedTopping.value.id) {
        const res = await useToppingService.updateTopping(
          editedTopping.value.id,
          editedTopping.value
        )
      } else {
        const res = await useToppingService.saveTopping(editedTopping.value)
      }
      dialog.value = false
      await getToppings()
    } catch (e) {
      console.log(e)
      messageStore.showError('Cannot save toppings')
    }
    loadingStore.isLoading = false
  }
  async function deleteTopping(id: number) {
    loadingStore.isLoading = true
    try {
      const res = await useToppingService.deleteTopping(id)
      await getToppings()
    } catch (e) {
      console.log(e)
      messageStore.showError('Cannot delete store')
    }
    loadingStore.isLoading = false
  }
  function editTopping(store: Topping) {
    editedTopping.value = JSON.parse(JSON.stringify(store))
    dialog.value = true
  }

  function selectToppingAll() {
    if (!allSelected.value) {
      selected.value = toppings.value.map((store) => store.id + '')
    }
  }
  function selectTopping() {
    allSelected.value = false
  }
  const deleteAllTopping = async () => {
    for (let i = 0; i < selected.value.length; i++) {
      await useToppingService.deleteTopping(selected.value[i])
    }
    await getToppings()
  }

  const getToppingByCategoryId = async (catId:number) => {
    try{
      console.log('getToppingByCategory')
      const res = await useToppingService.getToppingByCategoryId(catId);
      toppings.value = res.data
      console.log("--------------------------------")
      console.log(res.data)

    }catch(e){
      console.log(e)
      messageStore.showError('Cannot delete store')
    }
  }

  return {
    page,
    keyword,
    take,
    order,
    orderBy,
    lastPage,
    toppings,
    getToppings,
    dialog,
    saveTopping,
    editTopping,
    editedTopping,
    selectToppingAll,
    selectTopping,
    allSelected,
    selected,
    deleteAllTopping,
    search,
    deleteTopping,
    getToppingByCategoryId
  }
})
