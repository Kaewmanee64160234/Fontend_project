<script setup lang="ts">
import { useCustomerStore } from '@/store/customer.store';
import { onMounted, ref } from 'vue';
const customerStore = useCustomerStore();
const url = import.meta.env.VITE_URL_PORT
onMounted(() => {
  console.log(url)
    customerStore.getCustomers();
});
</script>
<template>
  
   <v-table>
    <thead>
      <tr>
        <th>Img</th>
        <th>ID</th>
        <th>Name</th>
        <th>tel</th>
        <th>Point</th>
        <th>Operations</th>
      </tr>
    </thead>
    <tbody >
      <tr v-for="item of customerStore.customers" :key="item.id" class="text-center">
        <td> <v-avatar ><v-img   :src="`${url}/customers/${item.id}/image`"></v-img></v-avatar></td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.tel }}</td>
        <td>{{ item.point }}</td>
        <td>
          <v-btn class="mr-5" 
            >Edit</v-btn
          ><v-btn >Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

</template>