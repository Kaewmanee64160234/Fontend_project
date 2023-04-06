<script setup lang="ts">
import router from '@/router';


import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { useOrderStore } from '@/store/order.store';
import { onMounted, ref } from 'vue';
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

              <td>{{ item.id }}</td>
              <!-- <td>{{ item.createdDate }}</td> -->
              <td>{{  new Date(item.createdDate+'').getDate()+'/'+new Date(item.createdDate+'').getMonth()+'/'+new Date(item.createdDate+'').getFullYear()+'  '+new Date( item.createdDate+'').getHours()+':'+new Date(item.createdDate+'').getMinutes()+':'+new Date(item.createdDate+'').getSeconds() }}</td>
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
        
 <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="orderStore.page" :length="orderStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
      </v-card-title>
    </v-card>
  </v-container>
  

</template>
