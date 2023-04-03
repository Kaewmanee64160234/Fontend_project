<script lang="ts" setup>
import { useProductStore } from '@/store/product.store'

const productStore = useProductStore()
const backendURL = import.meta.env.VITE_URL_PORT

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  catagoryId: {
    type: String,
    required: true
  }
})
</script>

<template>
 
    <div class="a-tag" >
      <div class="card item-card mt-2">

        <img
          class="card-img-top item-img"
          :src="`${backendURL}/products/image/${props.img}`"
          width="120px"
        />

        <div class="card-body text-center">
          <h5 class="card-title">{{ props.name }}</h5>
          <p class="card-text fontsm" style="color: peru;">฿{{ props.price }}</p>
        </div>
      </div>
    </div>

</template>

<style>
.a-tag{
  cursor: pointer;
}
.card-title {
  font-size: 16px !important;
  margin-bottom: 0;
}
.item-card .item-img {
  height: 115px !important;
  object-fit: cover;
}
.a-tag .item-card {
  /* width: 120px !important; */
  cursor: pointer;
  color: black !important;
}
.a-tag:hover .item-card {
  color: #1f3611 !important;
}
.a-tag:link {
  text-decoration: none;
}

.fontsm {
  font-size: small;
}
</style>