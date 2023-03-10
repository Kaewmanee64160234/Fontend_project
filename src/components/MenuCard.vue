<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { onMounted,ref } from 'vue';
import type Product from '@/store/types/product.type';

const productStore = useProductStore();
const backendURL = import.meta.env.VITE_URL_PORT;

onMounted(async () => {
  await productStore.getProducts();
})
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String ,
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
  catagoryId:{
    type: String,
    required: true,
  }

});
</script>

<template >
  <a href="#" >
    <TestDialogVue :cat="props.catagoryId+''" :name="props.name" :type="props.type"></TestDialogVue>
  <div class="card item-card mt-2">
  <img 
  class="card-img-top item-img"
        :src="`${backendURL}/products/image/${props.img}`"
        width="120px"
      />

      <div class="card-body text-center " >
        <h5 class="card-title" >{{ props.name }}</h5>
        <p class="card-text fontsm">{{ props.price }}</p>
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