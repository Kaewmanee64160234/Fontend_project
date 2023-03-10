<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { onMounted,ref } from 'vue';
import type Product from '@/store/types/product.type';

const orderList = ref<{product: Product; count: number; sum: number}[]>([]);
const productStore = useProductStore();
const backendURL = import.meta.env.VITE_BACKEND_URL;
function addProduct(item:Product){
  console.log(orderList.value);
  orderList.value.push({product: item, count: 1, sum: 1* item.price});
}
onMounted(async () => {
  await productStore.getProducts();
})
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  // cost: {
  //   type: String,
  //   required: true,
  // },
  img: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

});
</script>

<template >
  <a href="#" v-for="item of productStore.products" :key="item.id">
  <div class="card item-card" >
  <img 
  class="card-img-top item-img"
        :src="`${backendURL}/products/image/${props.img}`"
        
        width="120px"
      />

      <div class="card-body text-center">
        <h5 class="card-title" >{{ item.name }}</h5>
        <p class="card-text fontsm">{{ item.price }}</p>
      </div>
    </div>
</a>
</template>

<style>
.card-title{
  font-size: 16px !important;
  margin-bottom: 0;
}
.item-card .item-img{
  height: 115px !important;
  object-fit: cover;
}
a .item-card{
  /* width: 120px !important; */
  cursor:pointer;
  color: black !important;
}
a:hover .item-card{
  color: #1F3611  !important;;
}
a:link { text-decoration: none; }

.fontsm { font-size:small}
</style>