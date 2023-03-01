import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type Product from './types/product.type';
import axios from 'axios';
import productService from '@/services/product'
export const useProductStore = defineStore('Product', () => {
  const dialog = ref(false);
  const products = ref<Product[]>([]);
  const editedProduct = ref<Product>({ name: "", type: "-", size: "-", price: 0, image: 'no_image.jpg'});

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      editedProduct.value = { name: "", type: "-", size: "-", price: 0, image: 'no_image.jpg'};
    }
  });

  async function getProducts() {
    try {
      const res = await productService.getProducts();
      products.value = res.data;
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  }

  async function saveProduct() {
    try {
      const res = await productService.saveProduct(editedProduct.value)
      dialog.value = false;
    } catch (e) {
      console.log(e);
    }
  }

  return { products, getProducts, dialog, editedProduct, saveProduct}
})
