<!-- <script lang="ts" setup>
import order from '@/services/order'
import { usePointOfSale } from '@/store/pointOfSell.store'
import { useToppingStore } from '@/store/topping.store'
import type { OrderItem } from '@/store/types/orderItem.type'
import type Product from '@/store/types/product.type'
import type { Topping } from '@/store/types/topping'
import { computed, onMounted, ref } from 'vue'

const pointOfSaleStore = usePointOfSale()
const toppingStore = useToppingStore()
const toppingAdded = ref<Topping[]>([])
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
  image: product_.value.image,
  toppings: toppingAdded.value,
  detail: ''
})
// const save = () => {
//   const product = pointOfSaleStore.orderItemList.findIndex((item_) => {
//     if (item_.productId === product_.value.id) {
//       item_.amount += 1
//       item_.total = item_.amount * item_.price
//       return item_
//     }
//   })
// if (product < 0) {
//   orderItem.value = {
//     name: product_.value.name,
//     amount: 1,
//     productId: product_.value.id!,
//     price: product_.value.price,
//     total: product_.value.price * 1,
//     image: product_.value.image,
//     toppings: []
//   }
//     pointOfSaleStore.addToOrder(orderItem.value)
//   }
//   pointOfSaleStore.dialogTopping = false
// }
const save = () => {
  // Update the orderItem with selected size, sweetness, and toppings

  // Add additional details based on selected options
  orderItem.value.detail = `Size: ${orderItem.value.size}, Sweetness: ${orderItem.value.sweet}`

  // Check if the product with selected options already exists in the order
  const existingProductIndex = pointOfSaleStore.orderItemList.findIndex((item) => {
    return (
      item.productId === product_.value.id &&
      item.size === orderItem.value.size &&
      item.sweet === orderItem.value.sweet &&
      item.toppings === toppingAdded.value
    )
  })

  if (existingProductIndex >= 0) {
    // Product with selected options already exists, update quantity
    pointOfSaleStore.orderItemList[existingProductIndex].amount += 1
    pointOfSaleStore.orderItemList[existingProductIndex].total =
      pointOfSaleStore.orderItemList[existingProductIndex].amount *
      pointOfSaleStore.orderItemList[existingProductIndex].price
  } else {
    orderItem.value = {
      name: product_.value.name,
      amount: 1,
      productId: product_.value.id!,
      price: product_.value.price,
      total: product_.value.price * 1,
      image: product_.value.image,
      toppings: toppingAdded.value
    }
    pointOfSaleStore.addToOrder(orderItem.value)
  }

  // Close the dialog
  pointOfSaleStore.dialogTopping = false
}

const addtopping = (topping: Topping) => {
  const index = toppingAdded.value.findIndex((selectedTopping) => selectedTopping.id === topping.id)

  if (index === -1) {
    // Topping not found, add it to the toppingAdded array
    toppingAdded.value.push(topping)
  } else {
    // Topping found, remove it from the toppingAdded array
    toppingAdded.value.splice(index, 1)
  }
}
</script> -->

<script lang="ts" setup>
import order from '@/services/order'
import { usePointOfSale } from '@/store/pointOfSell.store'
import { useToppingStore } from '@/store/topping.store'
import type { OrderItem } from '@/store/types/orderItem.type'
import type Product from '@/store/types/product.type'
import type { Topping } from '@/store/types/topping'
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'

const pointOfSaleStore = usePointOfSale()
const toppingStore = useToppingStore()
const toppingAdded = ref<Topping[]>([])
const sweet = ref('100');
const size = ref('M');
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
  image: product_.value.image,
  toppings: toppingAdded.value,
  detail: ''
})
const arraysEqual = (arr1:Topping[], arr2:Topping[]) => {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
};
const save = () => {

const existingProductIndex = pointOfSaleStore.orderItemList.findIndex((item) => {
  
if( item.productId === product_.value.id &&
    item.size === size.value &&
    item.sweet === sweet.value &&
    arraysEqual(item.toppings, toppingAdded.value)){
      console.log("=======================")
      console.log(item)
      return item
    }
 
});

  console.log("-----------------------------")
  console.log(product_.value)
  console.log('product Id '+ orderItem.value.productId)
  console.log(existingProductIndex)


  if (existingProductIndex >-1) {

    // Product with selected options already exists, update quantity
    pointOfSaleStore.orderItemList[existingProductIndex].amount += 1
    for(const topp of pointOfSaleStore.orderItemList[existingProductIndex].toppings){
      pointOfSaleStore.orderItemList[existingProductIndex].price += topp.price
    }
    pointOfSaleStore.orderItemList[existingProductIndex].total =
      pointOfSaleStore.orderItemList[existingProductIndex].amount *
      pointOfSaleStore.orderItemList[existingProductIndex].price
  } else {
    let totalTopp = 0;
    for(const topp of orderItem.value.toppings){
      totalTopp += topp.price
    }
    orderItem.value = {
      name: product_.value.name,
      amount: 1,
      productId: product_.value.id!,
      price: product_.value.price,
      total: product_.value.price ,
      image: product_.value.image,
      sweet: sweet.value ,
      size: size.value,
      categoryId:product_.value.catagoryId,
      toppings: toppingAdded.value
    }
    pointOfSaleStore.addToOrder(orderItem.value)
  }

  // Close the dialog
  closeDialog()
  // pointOfSaleStore.dialogTopping = false
}
const addtopping = (topping: Topping) => {
  const index = toppingAdded.value.findIndex((selectedTopping) => selectedTopping.id === topping.id)

  if (index === -1) {
    // Topping not found, find the correct position based on id and insert the new topping
    const insertionIndex = findInsertionIndex(topping.id!)
    toppingAdded.value.splice(insertionIndex, 0, topping)
  } else {
    // Topping found, remove it from the toppingAdded array
    toppingAdded.value.splice(index, 1)
  }
}

// Function to find the correct insertion index based on id
const findInsertionIndex = (newToppingId: number) => {
  let insertionIndex = 0

  for (let i = 0; i < toppingAdded.value.length; i++) {
    if (toppingAdded.value[i].id! < newToppingId) {
      insertionIndex = i + 1
    } else {
      break
    }
  }

  return insertionIndex
}

const closeDialog = () => {
  pointOfSaleStore.toggle = null
  pointOfSaleStore.toggle2 = null
  toppingAdded.value = []
  pointOfSaleStore.dialogTopping = false
}
</script>

<template>
  <v-dialog v-model="pointOfSaleStore.dialogTopping" width="40vw" min-width="700px">
    <v-card>
      {{ toppingAdded }}
      <v-card-title>
        {{ product_.name  }}
      </v-card-title>
      <v-card-text v-if="product_.catagoryId === 3">
        <div class="d-flex align-left flex-column">
          <h5>Size</h5>
          <v-btn-toggle v-model="pointOfSaleStore.toggle" variant="outlined" divided rounded="xl">
            <v-btn @click="size = 'S'">S</v-btn>
            <v-btn @click="size = 'M'">M</v-btn>
            <v-btn @click="size = 'L'">L +10</v-btn>
          </v-btn-toggle>
        </div>
        <div
          class="d-flex align-left flex-column"
          v-if="
            product_.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate' || 'coffee'
          "
        >
          <h5>Sweet</h5>

          <v-btn-toggle v-model="pointOfSaleStore.toggle2" variant="outlined" divided rounded="xl">
            <v-btn @click="sweet = '0'">sweet 0%</v-btn>
            <v-btn @click="sweet = '25'">sweet 25%</v-btn>
            <v-btn @click="sweet = '50'">sweet 50%</v-btn>
            <v-btn @click="sweet = '100'">sweet 100%</v-btn>
            <v-btn @click="sweet = '125'">sweet 125%</v-btn>
          </v-btn-toggle>
        </div>
        <div
          class="ml-3"
          v-if="product_.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate'"
        >
          <h5>Topping</h5>
          <v-chip-group v-model="toppingAdded" column multiple>
            <v-checkbox
              v-for="(topping, index) in toppingStore.toppings"
              :key="index"
              :label="topping.name + '  +' + topping.price"
              @change="addtopping(topping)"
            ></v-checkbox>
          </v-chip-group>
        </div>
      </v-card-text>
      <v-card-text v-else> Add to cart 🛒 </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="text" @click="closeDialog()">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green" variant="text" @click="save()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
