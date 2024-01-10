<script lang="ts" setup>
import { usePointOfSale } from '@/store/pointOfSell.store'
import { useToppingStore } from '@/store/topping.store'
import type { OrderItem } from '@/store/types/orderItem.type'
import type Product from '@/store/types/product.type'
import { computed, onMounted, ref } from 'vue'

const pointOfSaleStore = usePointOfSale()
const toppingStore = useToppingStore()
const product_ = computed(() => {
  return pointOfSaleStore.temProduct
})
const toppings = computed(() => {
  return toppingStore.getToppingByCategoryId(3)
})
onMounted(async () => {
  await toppingStore.getToppingByCategoryId(3)
})
let orderItem = ref<OrderItem>({
  name: product_.value.name,
  amount: 1,
  productId: product_.value.id!,
  price: product_.value.price,
  total: product_.value.price * 1,
  image: product_.value.image
})
const save = () => {
  const product = pointOfSaleStore.orderItemList.findIndex((item_) => {
    if (item_.productId === product_.value.id) {
      item_.amount += 1
      item_.total = item_.amount * item_.price
      return item_
    }
  })
  if (product < 0) {
    orderItem.value = {
      name: product_.value.name,
      amount: 1,
      productId: product_.value.id!,
      price: product_.value.price,
      total: product_.value.price * 1,
      image: product_.value.image
    }
    pointOfSaleStore.addToOrder(orderItem.value)
  }
  pointOfSaleStore.dialogTopping = false
}
</script>
<template>
  <v-dialog v-model="pointOfSaleStore.dialogTopping" width="40vw" min-width="700px">
    <v-card>
      <v-card-title>
        {{ product_.name + " "+product_.catagoryId}}
      </v-card-title>
      <v-card-text v-if="product_.catagoryId === 3">
        <div class="d-flex align-left flex-column">
          <h5>Size</h5>
          <v-btn-toggle v-model="pointOfSaleStore.toggle" variant="outlined" divided rounded="xl">
            <v-btn>S</v-btn>
            <v-btn>M</v-btn>
            <v-btn>L +10</v-btn>
          </v-btn-toggle>
        </div>
        <div class="d-flex align-left flex-column"
          v-if="product_.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate' || 'coffee'">
          <h5>Sweet</h5>

          <v-btn-toggle v-model="pointOfSaleStore.toggle2" variant="outlined" divided rounded="xl">
            <v-btn>sweet 0%</v-btn>
            <v-btn>sweet 25%</v-btn>
            <v-btn>sweet 50%</v-btn>
            <v-btn>sweet 100%</v-btn>
            <v-btn>sweet 125%</v-btn>
          </v-btn-toggle>
        </div>
        <div class="ml-3" v-if="product_.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate'">
          <h5>Topping</h5>
          <v-chip-group v-model="pointOfSaleStore.amenities" column multiple>
           <v-chip filter variant="outlined" v-for="(topping,index) in  toppingStore.toppings" :key="index">{{ topping.name+"  +"+topping.price }}</v-chip>
            <!-- <v-chip filter variant="outlined"> brown Sugar Bubble +10 </v-chip>
            <v-chip filter variant="outlined"> cocoa +10 </v-chip>
            <v-chip filter variant="outlined"> konjac jelly +10 </v-chip>
            <v-chip filter variant="outlined"> whipped cream +10 </v-chip> -->
          </v-chip-group>
        </div>
      </v-card-text>
      <v-card-text v-else> Add to cart 🛒 </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="text" @click="pointOfSaleStore.dialogTopping = false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green" variant="text" @click="save()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
