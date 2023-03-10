
<script lang="ts" setup>
import TestDialog from './TestDialog.vue';
import { useProductStore } from '@/store/product.store';
import { onMounted } from 'vue';
const productStore = useProductStore();
onMounted(()=>{
  return productStore.getProducts();
})
</script>
<template>
  <div class="about" >
    <div  v-for="item of productStore.products" :key="item.id">
      <TestDialog   :cat="item.catagoryId+''" :name="item.name" :type="item.type"></TestDialog>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
