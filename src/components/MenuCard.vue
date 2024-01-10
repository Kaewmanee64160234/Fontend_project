
<script lang="ts" setup>
import { usePointOfSale } from '@/store/pointOfSell.store';
import { useProductStore } from '@/store/product.store'
import type { OrderItem } from '@/store/types/orderItem.type';
import type Product from '@/store/types/product.type';
import { computed, ref } from 'vue';

const pointOfSaleStore = usePointOfSale()
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
  <!-- food desserts -->
  <div class="ml-3">
    <div class="a-tag-fd">
      <div class="card item-card-fd mt-2">
        <div class="mt-3 ml-3">
          <div class="row">
            <div class="col-5">
              <img class="rounded-lg card-img-top item-img-fd" :src="`${backendURL}/products/image/${props.img}`"
                :lazy-src="`${backendURL}/products/image/${props.img}`" />
            </div>
            <div class="col-7">
              <h5 class="mt-2" style="font-size: 15;">{{ props.name }}</h5>
              <p class="mt-2 fontsm" style="color: peru;">฿{{ props.price }}</p>
              <v-btn class="mt-2" rounded variant="tonal" width="150px">
                Add To Cart 🛒
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<style>
/* food desserts */
.a-tag-fd {
cursor: pointer;
}

.item-card-fd .item-img-fd {
height: 100px !important;
width: 100px !important;
/* height: 115px !important; */
object-fit: cover;
border-radius: 15px;
}

.a-tag-fd .item-card-fd {
/* width: 120px !important; */
cursor: pointer;
color: black !important;
/* height: 200px; */
height: 145px;
width: 300px !important;
}

.a-tag-fd:hover .item-card-fd {
color: #1f3611 !important;
}

.a-tag:link {
text-decoration: none;
}
</style>