<script setup lang="ts">
import { useMenuStore } from '@/store/menu'
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
const customerStore = useCustomerStore()
const productStore = useProductStore()
const pointOfSaleStore = usePointOfSale()

const addToCart = (item: Product) => {
  pointOfSaleStore.updatetmpProduct(item)
  pointOfSaleStore.dialogTopping = true
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
})
</script>

<template>
  <div class="content-area">
    <DialogPayment></DialogPayment>
    <div class="content">
      <FindMemberDialog></FindMemberDialog>
      <PromotionDialog></PromotionDialog>
      <TestDialog></TestDialog>

      <div class="row">
        <div class="col-md-6 item-side">
          <div class="row-md-6">
            <v-tabs fixed-tabs color="#9F8772" dark>
              <v-tab @click="productStore.getProductByCatagory('2')"> เครื่องดื่ม </v-tab>
              <v-tab @click="productStore.getProductByCatagory('1')"> อาหาร </v-tab>
              <v-tab @click="productStore.getProductByCatagory('3')"> ของหวาน </v-tab>
            </v-tabs>
          </div>
          <div class="row">
            <div class="col-md-3 mb-2 mt-4" v-for="item in productStore.products" :key="item.id">
              <MenuCard
                :name="item.name"
                :cost="item.price"
                :type="item.type + ''"
                :img="item.image!"
                :price="item.price"
                :catagory-id="item.catagoryId + ''"
                @click="addToCart(item)"
              ></MenuCard>
            </div>
          </div>
        </div>

        <div class="col-md-6 mt-2">
          <div class="table-responsive cart-table" style="height: 50vh; overflow-y: auto">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="text-center">ลำดับ</th>
                  <th scope="col" class="text-center">รายการ</th>
                  <th scope="col" class="text-center">จำนวน</th>
                  <th scope="col" class="text-center">ราคา</th>
                  <th scope="col" class="text-center">ราคารวม</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="pointOfSaleStore.orderItemList.length === 0">
                  <td style="text-align: center" colspan="6">No data</td>
                </tr>
                <tr v-else v-for="(item, index) of pointOfSaleStore.orderItemList" :key="index">
                  <td style="text-align: center">{{ index + 1 }}</td>
                  <td scope="col" class="text-center">{{ item.name }}</td>
                  <td class="text-center">
                    <v-btn
                      color="secondary"
                      icon="mdi-plus"
                      size="x-small"
                      variant="text"
                      @click="addAmoutProduct(index)"
                    ></v-btn
                    ><span class="pa-2">{{ item.amount }}</span>
                    <v-btn
                      color="warning"
                      variant="text"
                      icon="mdi-minus-thick"
                      size="x-small"
                      @click="reduceAmoutProduct(index)"
                    ></v-btn>
                  </td>
                  <td class="text-center">
                    {{ item.price }}
                  </td>
                  <td class="text-center">{{ item.total }}</td>
                  <td>
                    <v-btn
                      color="red"
                      icon="mdi-delete"
                      size="x-small"
                      @click="deleteOrderItem(index)"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="summary mt-2" style="height: 20vh">
            <div class="row">
              <div class="col-md-7">
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">ราคารวม :</p>
                  <p class="fw-bold mb-0">{{ aboutCal?.total_ }} บาท</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">ส่วนลด :</p>
                  <p class="fw-bold mb-0">{{ pointOfSaleStore.total_discount }} บาท</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">ยอดที่ต้องชำระ :</p>
                  <p class="fw-bold mb-0">{{ aboutCal?.totalAndDicount }} บาท</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">ยอดรับชำระ :</p>
                  <p class="fw-bold mb-0">{{ pointOfSaleStore.recive_mon }} บาท</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-0">จำนวนเงินที่ทอน :</p>
                  <p
                    class="fw-bold mb-0"
                    v-if="aboutCal?.change_money?.value! <0"
                    style="color: red"
                  >
                    {{ aboutCal?.change_money }} บาท
                  </p>
                  <p class="fw-bold mb-0" v-else>{{ aboutCal?.change_money }} บาท</p>
                </div>
              </div>

              <div class="col-md-5">
                <span class="fw-bold mt-2">ระบุจำนวนเงินที่ได้รับ</span>
                <input
                  class="form-control"
                  id="amount"
                  type="text"
                  placeholder="Amount"
                  v-model="pointOfSaleStore.recive_mon"
                />
                <v-btn
                  color="#E9A178"
                  width="inherit"
                  class="mt-5"
                  @click="pointOfSaleStore.dialogPayment = true"
                  >Payment</v-btn
                >
              </div>
            </div>
          </div>
          <div class="summary mt-4" style="height: 30vh">
            <div class="row">
              <div class="col-md-6">
                <div class="d-flex justify-content-between">
                  <v-btn
                    color="#E9A178"
                    class="mt-5"
                    @click="pointOfSaleStore.dialogPromotion = true"
                    >Promotion</v-btn
                  >
                  <v-btn color="#E9A178" class="mt-5">Clear All</v-btn>
                </div>
                <br />
                <div class="d-flex justify-content-between">
                  <v-btn color="#E9A178" class="mt-5" @click="customerStore.dialog = true"
                    >Find Member</v-btn
                  >
                  <v-btn color="#E9A178" class="mt-5" @click="pointOfSaleStore.openOrder"
                    >Save</v-btn
                  >
                </div>
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
