<script lang="ts" setup>
import { usePointOfSale } from '@/store/pointOfSell.store';
import type { OrderItem } from '@/store/types/orderItem.type';
import type Product from '@/store/types/product.type';
import { ref } from 'vue'

const pointOfSaleStore = usePointOfSale();
const props = defineProps({
  name: String,
  type: String,
  cat: String,
})

const save = ()=>{
  const item = pointOfSaleStore.temProduct;
  const product = pointOfSaleStore.orderItemList.findIndex((item_) => {
    if (item_.productId === item.id) {
      return (item_.amount += 1)
    }
  })
  if (product < 0) {
    const orderItem = ref<OrderItem>({
      name: item.name,
      amount: 1,
      productId: item.id!
    })
    pointOfSaleStore.addToOrder(orderItem.value)
  }
  pointOfSaleStore.dialogTopping  = false;
}
</script>
<template>
  
    <v-dialog v-model="pointOfSaleStore.dialogTopping " width="600px" v-if="props.cat !== '1' && props.cat !== '3' " >
      <v-card >
        <v-card-title>
          {{ props.name }}
        </v-card-title>
        <v-card-text v-if="props.cat === '2'">
          <div class="d-flex align-left flex-column">
            <h5>Size</h5>
            <v-btn-toggle v-model="toggle" variant="outlined" divided>
              <v-btn>S</v-btn>
              <v-btn>M</v-btn>
              <v-btn>L</v-btn>
            </v-btn-toggle>
          </div>
          <div
            class="d-flex align-left flex-column"
            v-if="props.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate'"
          >
            <h5>Sweet</h5>

            <v-btn-toggle v-model="toggle2" variant="outlined" divided>
              <v-btn>หวานน้อย</v-btn>
              <v-btn>หวานปกติ</v-btn>
              <v-btn>หวานมาก +10</v-btn>
              <v-btn>หวาน125% +15</v-btn>
            </v-btn-toggle>
          </div>
          <div v-if="props.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate'">
            <h5>Topping</h5>

            <v-chip-group v-model="amenities" column multiple>
              <v-chip filter variant="outlined"> ไข่มุกบราวชูก้า +10 </v-chip>
              <v-chip filter variant="outlined"> ไข่มุกโกโก้ +10 </v-chip>
              <v-chip filter variant="outlined"> บุก +10 </v-chip>
              <v-chip filter variant="outlined"> วิปครีม +10 </v-chip>
            </v-chip-group>
          </div>
          <div v-if="props.type === 'juice' || 'soda' || 'alcoholic beverages' || 'etc.'"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" variant="text" @click="save()" > Save </v-btn>
          <v-btn color="primary" variant="text" @click="pointOfSaleStore.dialogTopping  = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  
</template>
