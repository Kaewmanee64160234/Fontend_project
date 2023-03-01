import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type Product from './types/product.type';
import axios from 'axios';
import productService from '@/services/product'
export const useProductStore = defineStore('Product', () => {
  const dialog = ref(false);
  const products = ref<Product[]>([]);
  const editedProduct = ref<Product & {files: File[]}>({ name: "", type: "-", size: "-", price: 0, image: 'no_image.jpg', files:[]});

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      editedProduct.value = { name: "", type: "-", size: "-", price: 0, image: 'no_image.jpg', files:[]};
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
    console.log(editedProduct.value);
    try {
      if(editedProduct.value.id) {
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
  }

  async function deleteProduct(id: number) {
  try {
      const res = await productService.deleteProduct(id);
      await getProducts();
  } catch (e) {
    console.log(e);
  }
}

  function editProduct(product: Product) {
    editedProduct.value = JSON.parse(JSON.stringify(product));
    dialog.value = true;
  }


  return { products, getProducts, dialog, editedProduct, saveProduct, editProduct, deleteProduct}
})
