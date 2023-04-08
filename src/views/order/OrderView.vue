<script setup lang="ts">
import router from '@/router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useOrderStore } from '@/store/order.store'
import { onMounted, ref } from 'vue'
import { useManageTime } from '@/store/manageDate'
const orderStore = useOrderStore()
const manageTimeStore = useManageTime()
const goTo = (index: string) => {
  router.push('/order/' + index)
  router.push(`/order/${index}`)
}
onMounted(() => {
  orderStore.endDate = '';
  orderStore.startDate = '';
  orderStore.getOrders()
})
const date = (index: string) => {

  let dd = new Date(index)
  let date = { date: '', mouth: '', year: '', hour: '', minute: '', second: '' }
  date.year = dd.getFullYear() + ''
  date.date = dd.getDate() + ''
  date.mouth = dd.getMonth() + ''
  date.minute = '' + dd.getMinutes()
  date.hour = '' + dd.getHours()
  date.second = '' + dd.getSeconds()
  if (dd.getDate() < 10) {
    date.date = '0' + dd.getDate()

  }
  if (dd.getMonth() < 10) {
    date.mouth = '0' + dd.getMonth()
  }
  if (dd.getHours() < 10) {
    date.hour = '0' + dd.getHours()
  }
  if (dd.getMinutes() < 10) {
    date.minute = '0' + dd.getHours()
  }
  if (dd.getSeconds() < 10) {
    date.second = dd.getSeconds() + '0'
  


  } if (dd.getMonth() < 10) {
    date.mouth = '0' + dd.getMonth()
  }
  if (dd.getHours() < 10) {
    date.hour = '0' + dd.getHours()
  }
  if (dd.getMinutes() < 10) {
    date.minute = '0' + dd.getHours()
  }
  if (dd.getSeconds() < 10) {
    date.second = dd.getSeconds() + '0'
  }
  return date;

}
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-container>
   
    <v-card>
      <v-card-title>
        <div class="row">
          <div class="col-md-6">
            Orders
     
          </div>
          <div class="col-md-2">
            <v-card class="ml-15" width="170px" style="float: right;">
              <input v-model="orderStore.startDate" type="date" style="cursor: pointer;">

            </v-card>
          </div>
          <div class="col-md-1 text-center" style="font-size: 21px;">To</div>
          <div class="col-md-2">

            <v-card width="170px" style="float: right;">
              <input v-model="orderStore.endDate" type="date" style="cursor: pointer;">
            </v-card>
          </div>
          <div class="col-md-1">
            <v-btn style="background-color: #609966; color: white; " @click="orderStore.getOrders">Submit</v-btn>
            <v-spacer></v-spacer>
          </div>
        </div>
        <VTable class="text-center mt-5">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderStore.orders" :key="index" class="text-center">
              <td>{{ index+1 }}</td>
              <!-- <td>{{ item.createdDate }}</td> -->

              <td>
                {{
                  date(item.createdDate + '').date +
                  '/' +
                  manageTimeStore.monthNum[new Date(item.createdDate + '').getMonth()] +
                  '/' +
                  new Date(item.createdDate + '').getFullYear() +
                  ' ' +
                  date(item.createdDate + '').hour +
                  ':' +
                  date(item.createdDate + '').minute +
                  ':' +
                  date(item.createdDate + '').second
                }}
              </td>

              <td>{{ item.discount }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.payment }}</td>


              <td>
                <v-btn
                  style="color:white"
                  color="#7DB9B6"
                  class="mdi mdi-receipt-text"
                  @click="goTo(item.id + '')"
                >
                  RECEIPT
                </v-btn>
              </td>
            </tr>
          </tbody>
          <tbody v-if="orderStore.orders.length == 0">
            <tr>
              <td colspan="7" class="text-center">No data</td>
            </tr>
          </tbody>
        </VTable>

        <v-container width="100%" justify="center">
          <v-pagination
            justify="center"
            v-model="orderStore.page"
            :length="orderStore.lastPage"
            rounded="circle"
          ></v-pagination>
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>
