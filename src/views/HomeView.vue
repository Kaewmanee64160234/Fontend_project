<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TestDialog from '@/components/ToppingDialog.vue'
import MenuCard from '@/components/MenuCard.vue'
import FindMemberDialog from '@/components/FindMemberDialog.vue'
import PromotionDialog from '@/components/promotion/PromotionDialog.vue'
import { usePointOfSale } from '@/store/pointOfSell.store'
import DialogPayment from '@/components/pos/DialogPayment.vue'
import { useCustomerStore } from '@/store/customer.store'
import { useProductStore } from '@/store/product.store'
import type Product from '@/store/types/product.type'
import type { OrderItem } from '@/store/types/orderItem.type'
import { computed } from 'vue'
import DialogCompleteOrder from '@/components/pos/DialogCompleteOrder.vue'
import AddCustomerDialog from '@/components/customer/AddCustomerDialog.vue'
const customerStore = useCustomerStore()
const productStore = useProductStore()
const pointOfSaleStore = usePointOfSale()
const url = import.meta.env.VITE_URL_PORT
const product_ = computed(() => {
  return pointOfSaleStore.temProduct
})
const addToCart = (item: Product) => {
  pointOfSaleStore.updatetmpProduct(item)
  if(item.catagoryId !==1 && item.catagoryId !==3 ){
    pointOfSaleStore.dialogTopping = true
  }else{
    const product = pointOfSaleStore.orderItemList.findIndex((item_) => {
    if (item_.productId === product_.value.id) {
      item_.amount += 1
      item_.total = item_.amount * item_.price
      return item_
    }
  })
  if (product < 0) {
    let orderItem = ref<OrderItem>({
        name: product_.value.name,
      amount: 1,
      productId: product_.value.id!,
      price: product_.value.price,
      total: product_.value.price * 1,
      image: product_.value.image
      })
    pointOfSaleStore.addToOrder(orderItem.value)
  }
  
    
  }
}
const deleteOrderItem = (index: number) => {
  pointOfSaleStore.orderItemList.splice(index, 1)
}
const addAmoutProduct = (index: number) => {
  pointOfSaleStore.orderItemList[index].amount += 1
  pointOfSaleStore.orderItemList[index].total =
    pointOfSaleStore.orderItemList[index].amount * pointOfSaleStore.orderItemList[index].price
}
const reduceAmoutProduct = (index: number) => {
  if (pointOfSaleStore.orderItemList[index].amount <= 1) {
    deleteOrderItem(index)
  } else {
    pointOfSaleStore.orderItemList[index].amount -= 1
    pointOfSaleStore.orderItemList[index].total =
      pointOfSaleStore.orderItemList[index].amount * pointOfSaleStore.orderItemList[index].price
  }
}
const aboutCal = computed(() => {
  return pointOfSaleStore.CaltotalPrice()
})
onMounted(() => {
  productStore.getProductByCatagory('2')
  pointOfSaleStore.total_discount;
})

function Paycash() {
  pointOfSaleStore.dialogPayment = false;
  pointOfSaleStore.order.payment = 'Cash'
}
</script>

<template>
  <v-row class="ml-5" style="float:left">
  <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" title="Home" value="home" to="/main">
  </v-btn>
</v-row>
<div class="content-area">
  <DialogPayment></DialogPayment>
  <DialogCompleteOrder></DialogCompleteOrder>
  <div class="content">
    <FindMemberDialog></FindMemberDialog>
    <AddCustomerDialog></AddCustomerDialog>
    <PromotionDialog></PromotionDialog>
    <TestDialog></TestDialog>
    <div class="row">
      <div class="col-md-6 item-side">
        <div class="row-md-6">
          <v-tabs fixed-tabs color="#9F8772" dark>
            <v-tab @click="productStore.getProductByCatagory('2')"> Drinks </v-tab>
            <v-tab @click="productStore.getProductByCatagory('1')"> Foods </v-tab>
            <v-tab @click="productStore.getProductByCatagory('3')"> Desserts </v-tab>
          </v-tabs>
          </div>
          <div class="row">
            <div class="col-md-6 mb-2 mt-4" v-for="item in productStore.products" :key="item.id">
              <MenuCard :name="item.name" :cost="item.price" :type="item.type + ''" :img="item.image!" :price="item.price"
                :catagory-id="item.catagoryId + ''" @click="addToCart(item)">
              </MenuCard>
            </div>
          </div>
        </div>

        <div class="col-md-6 mt-2">
          <div class="table-responsive cart-table shadow-md sm:rounded-lg" style="height: 50vh; overflow-y: auto">
            <div class="w-100 md p-8">
              <div class="flex justify-between mb-4">
                <h4 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
              </div>
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li class="py-3 sm:py-4">
                    <div v-if="pointOfSaleStore.orderItemList.length === 0">
                      <p style="text-align: center">No data</p>
                    </div>
                    <div v-else v-for="(item, index) of pointOfSaleStore.orderItemList" :key="index"
                      class="flex items-center space-x-4 mt-2">
                      <div class="flex-shrink-0">
                        <img class="rounded-full w-20 h-20" :src="`${url}/products/image/${item.image}`">
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {{ item.name }}
                        </p>
                      
                        <v-row>
                          <v-col>
                            <div class="flex items-center justify-between">
                              <div
                                class="flex items-center mb-5 items-center text-base font-semibold text-gray-900 dark:text-white">
                                ฿{{ item.price }}
                                <p class="text-sm text-gray-500 mr-2 px-2.5 py-0.5 dark:text-gray-400">x {{ item.amount }}
                                </p>
                              </div>
                            </div>
                          </v-col>

                          <v-col>
                            <v-btn color="secondary" icon="mdi-plus" size="x-small" variant="text"
                              @click="addAmoutProduct(index)"></v-btn><span class="pa-2">{{ item.amount }}</span>
                            <v-btn color="warning" variant="text" icon="mdi-minus-thick" size="x-small"
                              @click="reduceAmoutProduct(index)"></v-btn>
                          </v-col>
                          <v-col style="text-align: center;">
                            <div class="inline-flex  items-center text-base font-semibold text-gray-900 dark:text-white"
                              style="text-align: right; margin-left:15%;">
                              {{ item.total }}
                            </div>
                          </v-col>
                          <v-col>
                              <v-btn class="text-center" style="text-align: right; margin-left:50%;" color="red" icon="mdi-delete" size="x-small" @click="deleteOrderItem(index)"></v-btn>
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>


          </div>

          <div class="summary mt-4" style="height: 20vh">
            <div class="row">
              <!-- {{ pointOfSaleStore.order }} -->

              <div class="col-md-5">
                <span class="fw-bold mt-2">Enter the amount received</span>
                <input class="form-control mt-3" id="amount" type="text" placeholder="Amount"
                  v-model="pointOfSaleStore.recive_mon" />

                <v-btn block rounded="xl" style="background-color: #FFCB42; color: white;" class="mt-7" width="300px"
                  @click="customerStore.dialog = true">Find Member</v-btn>

                <v-btn block rounded="xl" style="background-color: #607EAA; color: white;" class="mt-7" width="300px"
                  @click="pointOfSaleStore.dialogPromotion = true"
                  v-if="pointOfSaleStore.order.customerId !== 0">Promotion</v-btn>
                <v-btn block rounded="xl" tyle="background-color: #607EAA; color: white;" class="mt-7" width="300px"
                  v-else :disabled="true">Promotion</v-btn>

                <v-btn block rounded="xl" style="background-color: #6C4AB6; color: white" class="mt-7" width="300px"
                  @click="customerStore.addCustomerDialog = true">Add Customer</v-btn>

1                <v-btn block rounded="xl" style="background-color: #FF2442; color: white" class="mt-7" width="300px"
                  @click="pointOfSaleStore.deleteAllOrder">Clear All</v-btn>
              </div>
              <div class="col-md-7">
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">Total :</p>
                  <p class="fw-bold mb-0">{{ aboutCal?.total_ }} Bath</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">Discount :</p>
                  <p class="fw-bold mb-0">{{ pointOfSaleStore.total_discount }} Bath</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">Payment amount :</p>
                  <p class="fw-bold mb-0">{{ aboutCal?.totalAndDicount }} Bath</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">Received :</p>
                  <p class="fw-bold mb-0">{{ pointOfSaleStore.recive_mon }} Bath</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">Change :</p>
                  <p class="fw-bold mb-0" v-if="aboutCal?.change_money?.value! < 0" style="color: red">
                    {{ aboutCal?.change_money }} Bath
                  </p>
                  <p class="fw-bold mb-0" v-else>{{ aboutCal?.change_money }} Bath</p>
                </div>
                <div class="mt-2">Select Payment Menthod</div>
                <v-row dense>
                  <v-row>
                    <v-col class="mt-2" col="2.5">
                      <v-btn style="background-color: #A2DBFA; color: #1A374D;" height="130px" width="180"
                        prepend-icon="mdi mdi-barcode-scan" stacked variant="outlined"
                        @click="pointOfSaleStore.dialogPayment = true">Promt Pay</v-btn>
                    </v-col>
                    <v-col class="mt-2" col="2.5">
                      <v-btn style="background-color: #C1F8CF; color: #1A374D;" height="130px" width="180"
                        prepend-icon="mdi mdi-cash" stacked variant="outlined" @click="Paycash">Cash</v-btn>
                    </v-col>
                    <v-row>
                    </v-row>
                  </v-row>
                </v-row>
                <v-row dense>
                  <v-col class="mt-1">
                    <v-btn block rounded="xl" width="inherit" height="40px"
                      style="background-color: #03C988; color: white;"
                      @click="pointOfSaleStore.openOrder">Save</v-btn></v-col>
                </v-row>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.content-area {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

.cart-table {
  max-height: 300px;
}

.item-side {
  max-height: 90vh;
  overflow: scroll;
}

.item-side::-webkit-scrollbar,
.cart-table::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.item-side::-webkit-scrollbar-thumb,
.cart-table::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 999px;
}
</style>