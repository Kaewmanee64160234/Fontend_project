import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type Product from './types/product.type';
import axios from 'axios';
import productService from '@/services/product'
import { useLoadingStore } from '@/store/loading';

export const useProductStore = defineStore('Product', () => {
  const loadingStore = useLoadingStore();
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const dialog = ref(false);
  const products = ref<Product[]>([]);
  const editedProduct = ref<Product & { files: File[] }>({ name: "", type: "-", size: "-", price: 0, image: 'no_image.jpg', files: [] });

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      editedProduct.value = { name: "", type: "-", size: "-", price: 0, image: 'no_image.jpg', files: [] };
    }
  });

  async function getProducts() {
    loadingStore.isLoading = true;
    try {
      const res = await productService.getProducts();
      products.value = res.data;
      console.log(res)
    } catch (e) {
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function saveProduct() {
    loadingStore.isLoading = true;
    console.log(editedProduct.value);
    try {
      if (editedProduct.value.id) {
        const res = await productService.updateProduct(editedProduct.value.id, editedProduct.value);
      } else {
        const res = await productService.saveProduct(editedProduct.value);
        console.log(editedProduct.value);
      }
      dialog.value = false;
      await getProducts();
    } catch (e) {
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function deleteProduct(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await productService.deleteProduct(id);
      await getProducts();
    } catch (e) {
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  function editProduct(product: Product) {
    editedProduct.value = JSON.parse(JSON.stringify(product));
    dialog.value = true;
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
      await getProducts();
    }
  }


    return { 
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
      allSelected
     }
  }
)
