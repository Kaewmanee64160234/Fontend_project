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
  <div class="a-tag">
  <div class="card item-card mt-2">

    <img class="rounded-bottom card-img-top item-img" :src="`${backendURL}/products/image/${props.img}`"
      :lazy-src="`${backendURL}/products/image/${props.img}`" />

    <div class="text-center">
      <h5 class="mt-4" style="font-size: 15;">{{ props.name }}</h5>
      <p class="mt-1 fontsm" style="color: peru;">฿{{ props.price }}</p>
      <!-- <v-btn class="mt-2" rounded variant="tonal" width="130px">
              Add To Cart
            </v-btn> -->
    </div>
  </div>
</div>
<!-- <div class="ml-3" v-if="props.catagoryId === '2'">
    <div class="a-tag">
      <div class="card item-card mt-2">
        <div class="mt-3 ml-3">
          <div class="row">
            <div class="col-5">
              <img class="rounded-lg card-img-top item-img" :src="`${backendURL}/products/image/${props.img}`"
                :lazy-src="`${backendURL}/products/image/${props.img}`" />
            </div>
            <div class="col-7">
              <h5 class="mt-4" style="font-size: 15;">{{ props.name }}</h5>
              <p class="mt-10 fontsm" style="color: peru;">฿{{ props.price }}</p>
            </div>
          </div>

        </div>
        <div class="ml-3">
          <h5 style="font-size: 15;">Cup Size</h5>
          <v-chip-group column>
            <v-chip variant="outlined">S</v-chip>
            <v-chip variant="outlined">M</v-chip>
            <v-chip variant="outlined">L +10</v-chip>
          </v-chip-group>
          <div v-if="props.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate' || 'coffee'">
            <h5 style="font-size: 15;">Sugar Level</h5>
            <v-chip-group column>
              <v-chip variant="outlined">50%</v-chip>
              <v-chip variant="outlined">100%</v-chip>
              <v-chip variant="outlined">125%</v-chip>
              <v-chip variant="outlined">175%</v-chip>
            </v-chip-group>
          </div>
          <div v-if="props.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate'">
              <h5 style="font-size: 15;">Topping</h5>
              <v-chip-group column>
                <v-chip variant="outlined" @click="pointOfSaleStore.dialogTopping = true">Add Topping</v-chip>
              </v-chip-group>
            </div>
            <v-btn class="mt-2" rounded variant="tonal" width="275px">
              Add To Cart 🛒
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    /////
    <div class="ml-3" v-if="props.catagoryId === '1' || '3'">
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
                <v-btn class="mt-2" rounded variant="tonal" width="140px">
                  Add To Cart 🛒
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>

<style>
.a-tag {
  cursor: pointer;
}

/* .card-title {
  font-size: 15px !important;
  margin-bottom: 0;
} */

.item-card .item-img {
  /* height: 100px !important;
  width: 100px !important; */
  height: 115px !important;
  object-fit: cover;
  border-radius: 15px;
}

.a-tag .item-card {
  /* width: 120px !important; */
  cursor: pointer;
  color: black !important;
  height: 200px;
  /* height: 375px;
  width: 300px !important; */
}

.a-tag:hover .item-card {
  color: #1f3611 !important;
}

.a-tag:link {
  text-decoration: none;
}

.fontsm {
  font-size: 12;
}

.a-tag-fd {
  cursor: pointer;
}

/* .card-title {
  font-size: 15px !important;
  margin-bottom: 0;
} */

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