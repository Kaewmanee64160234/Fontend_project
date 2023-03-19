<script setup lang="ts">
import router from '@/router';


import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { useOrderStore } from '@/store/order.store';
import { onMounted } from 'vue';

const orderStore = useOrderStore();
const goTo = (index: string) => {
  router.push('/order/' + index);
}
onMounted(() => {
  orderStore.getOrders();

});
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-container>
    <v-card>
      <v-card-title>
        Orders
        <VTextField style="width: 20%" variant="solo" color="deep-purple-accent-4" class="mt-7" density="compact"
          append-inner-icon="mdi-magnify" label="Search" single-line hide-details v-model="orderStore.search">
        </VTextField>
        <VTable class="text-center mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>CustomerID</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Operations</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderStore.orders" :key="index" class="text-center">

              <td>{{ item.id }}</td>
              <td>{{ item.createdDate }}</td>
              <td >{{ item.customerId }}</td>
              <td>{{ item.discount }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.payment }}</td>

              <td>
                
                <v-btn color="blue-lighten-1" variant="outlined" class="mdi mdi-receipt-text" @click="goTo(item.id + '')">
                  RECEIPT </v-btn>
              </td>
            </tr>
          </tbody>
          <tbody v-if="orderStore.orders.length == 0">
            <tr>
              <td colspan="7" class="text-center">No data</td>
            </tr>
          </tbody>
        </VTable>
      </v-card-title>
    </v-card>
  </v-container>
</template>
