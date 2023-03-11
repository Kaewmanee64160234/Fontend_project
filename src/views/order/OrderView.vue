<script setup lang="ts">
import router from '@/router';
import { useOrderStore } from '@/store/order.store';
import { onMounted } from 'vue';

const orderStore = useOrderStore();
const goTo = (index:string) => { 
    router.push('/order/' + index);
}
onMounted(() => {
    orderStore.getOrders();
    
});
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>
        Orders
       <v-spacer> </v-spacer>
        <!-- <v-text-field
          style="width: 20%"
          variant="solo"
          color="deep-purple-accent-4"
          class="mt-7"
          density="compact"
          append-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          v-model="customerStore.search"
        ></v-text-field> -->
        <v-table class="text-center mt-5">
          <thead>
            <tr>
             
             
              <th>ID</th>
              <th>Name</th>
              <th>tel</th>
              <th>Point</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in orderStore.orders" :key="index" class="text-center">
              
             
              <td>{{ item.id }}</td>
              <td>{{ item.customerId }}</td>
              <td>{{ item.total }}</td>

              <td>
                 
                ><v-btn color="primary" class="mdi mdi-home-city" @click="goTo(item.id+'')">More</v-btn>
              </td>
            </tr>
           
          </tbody>
          <tbody v-if="orderStore.orders.length == 0" >
          <tr >
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
        </v-table>
      </v-card-title>
    </v-card>
  </v-container>
</template>
