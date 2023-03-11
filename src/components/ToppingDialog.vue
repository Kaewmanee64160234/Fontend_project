<script lang="ts" setup>
import { usePointOfSale } from '@/store/pointOfSell.store'
import type { OrderItem } from '@/store/types/orderItem.type'
import type Product from '@/store/types/product.type'
import { computed, ref } from 'vue'

const pointOfSaleStore = usePointOfSale()
const product_ = computed(() => {
  return pointOfSaleStore.temProduct
})

const save = () => {
  const product = pointOfSaleStore.orderItemList.findIndex((item_) => {
    if (item_.productId === product_.value.id) {
      item_.amount +=1;
      item_.total = item_.amount * item_.price;
      return item_;
    }
  })
  if (product < 0) {
    const orderItem = ref<OrderItem>({
      name: product_.value.name,
      amount: 1,
      productId: product_.value.id!,
      price: product_.value.price,
      total: product_.value.price * 1
    })
    pointOfSaleStore.addToOrder(orderItem.value)
  }
  pointOfSaleStore.dialogTopping = false
}
</script>
<template>
  <v-dialog v-model="pointOfSaleStore.dialogTopping" width="35vw" min-width="500px">
    <v-card>
      <v-card-title>
        {{ product_.name }}
      </v-card-title>
      <v-card-text v-if="product_.catagoryId === 2">
        <div class="d-flex align-left flex-column">
          <h5>Size</h5>
          <v-btn-toggle v-model="pointOfSaleStore.toggle" variant="outlined" divided>
            <v-btn>S</v-btn>
            <v-btn>M</v-btn>
            <v-btn>L</v-btn>
          </v-btn-toggle>
        </div>
        <div
          class="d-flex align-left flex-column"
          v-if="product_.type === 'tea' && 'smoothies' && 'milkshakes' && 'hot chocolate'"
        >
          <h5>Sweet</h5>

          <v-btn-toggle v-model="pointOfSaleStore.toggle2" variant="outlined" divided>
            <v-btn>หวานน้อย</v-btn>
            <v-btn>หวานปกติ</v-btn>
            <v-btn>หวานมาก +10</v-btn>
            <v-btn>หวาน125% +15</v-btn>
          </v-btn-toggle>
        </div>
        <div v-if="product_.type === 'tea' && 'smoothies' && 'milkshakes' && 'hot chocolate'">
          <h5>Topping</h5>

          <v-chip-group v-model="pointOfSaleStore.amenities" column multiple>
            <v-chip filter variant="outlined"> ไข่มุกบราวชูก้า +10 </v-chip>
            <v-chip filter variant="outlined"> ไข่มุกโกโก้ +10 </v-chip>
            <v-chip filter variant="outlined"> บุก +10 </v-chip>
            <v-chip filter variant="outlined"> วิปครีม +10 </v-chip>
          </v-chip-group>
        </div>
      </v-card-text>
      <v-card-text v-else> เพิ่มลงตระกร้า 🛒 </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" variant="text" @click="save()"> Save </v-btn>
        <v-btn color="primary" variant="text" @click="pointOfSaleStore.dialogTopping = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
