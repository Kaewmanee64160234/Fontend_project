import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type Product from './types/product.type'
import productService from '@/services/product'
import { useLoadingStore } from '@/store/loading'
import { useMessageStore } from './message'

export const useProductStore = defineStore('Product', () => {
  const search = ref('')
  const messageStore = useMessageStore()
  const loadingStore = useLoadingStore()
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const dialog = ref(false)
  const products = ref<Product[]>([])
  const loaded = ref(false)
  const loading = ref(false)
  const editedProduct = ref<Product & { files: File[] }>({
    name: '',
    catagoryId: 1,

    category: '',
    type: '',
    size: '-',
    price: 0,
    image: 'no_image.jpg',
    files: []
  })
  const typeProduct = ref({
    Foods: ['breakfast', 'side dish', 'main dish', 'appetizer', 'etc.'],
    Drinks: [
      'coffee',
      'tea',
      'hot chocolate',
      'smoothies',
      'juice',
      'soda',
      'milkshakes',
      'alcoholic beverages',
      'etc.'
    ],
    Desserts: ['pastries', 'cookies', 'cake', 'pies', 'brownie', 'macarons', 'cookie', 'etc.']
  })

  // about pagination
  const page = ref(1)
  const take = ref(5)
  const keyword = ref("")
  const order = ref('ASC')
  const orderBy = ref('');
  const lastPage = ref(0);

  watch(page,async (newPage, oldPage) => {
    await getProducts()
  })
  watch(keyword,async (newPage, oldPage) => {
    await getProducts()
  })


  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedProduct.value = {
        name: '',
        type: '',
        size: '-',
        price: 0,
        catagoryId: 1,
        category: '',
        image: 'no_image.jpg',
        files: []
      }
    }
  })

  async function getProductByCatagory(id: string) {
    loadingStore.isLoading = true
    try {
      const response = await productService.getProductByCatagory(id)
      products.value = response.data.data
      // console.log(products.value)

      loadingStore.isLoading = false
      return products.value
    } catch (e) {
      messageStore.showError('ไม่สามารถดึงข้อมูล Product ได้')
    }

    loadingStore.isLoading = false
  }

  async function getProducts() {
    loadingStore.isLoading = true
    try {
      const res = await productService.getProducts({
        page:page.value,
        take:take.value,
        keyword:keyword.value,
        order:order.value,
        orderBy:orderBy.value
      })
      products.value = res.data.data
      lastPage.value = res.data.lastPage
      console.log('products.value')
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถดึงข้อมูล Product ได้')
    }
    loadingStore.isLoading = false
  }

  async function saveProduct() {
    loadingStore.isLoading = true
    try {
      if (editedProduct.value.category === 'Foods') {
        //*
        editedProduct.value.category = 1
      } else if (editedProduct.value.category === 'Drinks') {
        editedProduct.value.category = 2
      } else if (editedProduct.value.category === 'Desserts') {
        editedProduct.value.category = 3
      }

      if (editedProduct.value.id) {
        const res = await productService.updateProduct(editedProduct.value.id, editedProduct.value)
      } else {
        const res = await productService.saveProduct(editedProduct.value)
      }
      dialog.value = false
      await getProductByCatagory('2')
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถบันทึกข้อมูล Product ได้')
    }
    loadingStore.isLoading = false
  }
  async function deleteProduct(id: number) {
    loadingStore.isLoading = true
    try {
      const res = await productService.deleteProduct(id)
      await getProductByCatagory('2')
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถลบ Product ได้')
    }
    loadingStore.isLoading = false
  }

  function editProduct(product: Product) {
    editedProduct.value = JSON.parse(JSON.stringify(product))
    dialog.value = true
  }

  function selectProductAll() {
    if (!allSelected.value) {
      selected.value = products.value.map((product) => product.id + '')
    }
  }
  function selectProduct() {
    allSelected.value = false
  }

  async function deleteProducts() {
    for (let i = 0; i < selected.value.length; i++) {
      await productService.deleteProduct(selected.value[i])
      await getProductByCatagory('2')
    }
  }
  const getProductByName = async () => {
    try {
      if (search.value !== '') {
        setTimeout(() => {
          loading.value = false
          loaded.value = true
        }, 2000)
        const res = await productService.findProductByName(search.value)
        products.value = res.data
      } else {
        await getProducts()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    lastPage,
    order,
    orderBy,
    page,
    take,
    keyword,
    loading,
    loaded,
    getProductByName,
    products,
    getProducts,
    dialog,
    editedProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    selectProductAll,
    selectProduct,
    deleteProducts,
    selected,
    allSelected,
    search,
    typeProduct,
    getProductByCatagory
  }
})
