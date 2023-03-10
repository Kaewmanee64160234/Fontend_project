
<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { onMounted } from 'vue';
const productStore = useProductStore();
onMounted(()=>{
  return productStore.getProducts();
})
</script>
<template>
  <div class="about" >
  <h1>About</h1>
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
