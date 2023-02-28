<script setup lang="ts">
import CustomerDialog from '@/components/customer/CustomerDialog.vue';
import { useCustomerStore } from '@/store/customer.store';
import { onMounted, ref } from 'vue';
import ConfirmDialog from "@/components/ConfirmDialog.vue";

// import type Customer from '@/store/types/customer.type'
const confirmDlg = ref();
const customerStore = useCustomerStore();
const url = import.meta.env.VITE_URL_PORT
onMounted(() => {
  console.log(url)
    customerStore.getCustomers();
});
const deleteCustomer = async (id:string) => {
  await confirmDlg.value.openDialog("ยืนยันการลบ", `คุณต้องการลบลูกค้าคนนี้ใช่หรือไม่?`,'Accept','Cancel');
  customerStore.deleteCustomer(id);
}
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>

    <customer-dialog></customer-dialog>

  <v-container>
   
    <v-btn color="secondary" @click="customerStore.dialog = !customerStore.dialog">Add new customer</v-btn>
      <v-table  class="text-center">
    <thead>
      <tr>
        <th></th>
        <th>ID</th>
        <th>Name</th>
        <th>tel</th>
        <th>Point</th>
        <th>Operations</th>
      </tr>
    </thead>
    <tbody >
      <tr v-for="item of customerStore.customers" :key="item.id" class="text-center">
        <td> <v-avatar ><v-img   :src="`${url}/customers/image/${item.image}`"></v-img></v-avatar></td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.tel }}</td>
        <td>{{ item.point }}</td>
        <td>
          <v-btn class="mr-5" 
           color="yellow" @click="customerStore.editedCustomer(item)">Edit</v-btn
          ><v-btn color="red" @click="deleteCustomer(item.id+'')">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
    
  </v-container>
   

</template>