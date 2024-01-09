import { defineStore } from 'pinia'
import type { Topping } from './types/topping';
import { ref, watch } from 'vue';
import { useLoadingStore } from './loading';


export const useToppingStore = defineStore('Topping', () => {
    const toppings = ref<Topping[]>([]);
    const selectedToppings = ref<Topping[]>([]);
    const editedToppings = ref<Topping>({category: {name: '',},name: '',price:0});
    const loadingStore = useLoadingStore()
    const search = ref('')
    const dialog = ref(false)
    const loaded = ref(false)
    const loading = ref(false)
    watch(dialog, (newDialog, oldDialog) => {
      console.log(newDialog)
      if (!newDialog) {
        editedToppings.value = { category: {name: ''}, name: '',price:0}
      }
    })

    // about pagination
const page = ref(1)
const take = ref(5)
const keyword = ref('')
const order = ref('ASC')
const orderBy = ref('')
const lastPage = ref(0)
const cat = ref('');

watch(page, async (newPage, oldPage) => {
  await getToppings();
})
watch(keyword, async (newKey, oldKey) => {
  if(keyword.value.length >=3){
    await getToppings()
  }if(keyword.value.length ===0){
    await getToppings()

  }
})
watch(lastPage, async (newlastPage, oldlastPage) => {
  if (newlastPage < page.value) {
    page.value = 1
  }
})

const getToppings = ()=>
{
    
}

});