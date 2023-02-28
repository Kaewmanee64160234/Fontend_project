<script setup lang="ts">
import { useCustomerStore } from '@/store/customer.store';
import { onMounted } from 'vue';
const customerStore = useCustomerStore();
onMounted(() => {
    customerStore.getCustomers();
});
</script>
<template>
   <v-table>
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
      <tr v-for="item of customerStore.customers" :key="item.id">
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