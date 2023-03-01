<script setup lang="ts">
import CustomerDialog from '@/components/customer/CustomerDialog.vue'
import { useCustomerStore } from '@/store/customer.store'
import { computed, onMounted, ref } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

// import type Customer from '@/store/types/customer.type'
const confirmDlg = ref()
const customerStore = useCustomerStore()
const url = import.meta.env.VITE_URL_PORT


const customers = computed(() => {
  if (!customerStore.search) {
    return customerStore.customers;
  } else {
    return customerStore.customers.filter((customer) => {
      return customer.name.toLocaleLowerCase().includes( customerStore.search
      )
    });
  }
});
onMounted(() => {
  console.log(url)
  customerStore.getCustomers()
})
const deleteCustomer = async (id: string) => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบลูกค้าคนนี้ใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  customerStore.deleteCustomer(id)
}

const deleteAllCustomers = async () => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบลูกค้าข้อมูลลูกค้าใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  await customerStore.deleteCustomers()
}
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>

  <customer-dialog></customer-dialog>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn
          class="mdi mdi-plus"
          style="float: right; color: white"
          color="#8ad879"
          @click="customerStore.dialog = !customerStore.dialog"
          >Add new customer</v-btn
        >
        <v-btn class="mdi mr-2  mdi-delete" style="float: right; color: white" color="red" @click="deleteAllCustomers">Delete All</v-btn>
        <v-spacer> </v-spacer>
        <v-text-field
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
        ></v-text-field>
        <v-table class="text-center mt-5">
          <thead>
            <tr>
              <th>
                <v-checkbox
                  class="d-flex pa-4"
                  color="indigo"
                  v-model="customerStore.allSelected"
                  @click="customerStore.selectCustomerAll"
                ></v-checkbox>
              </th>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>tel</th>
              <th>Point</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of customers" :key="item.id" class="text-center">
              <td>
                <v-checkbox
                  class="d-flex pa-4"
                  color="indigo"
                  v-model="customerStore.selected"
                  @click="customerStore.selectCustomer()"
                  :value="item.id+''"
                ></v-checkbox>
              </td>
              <td>
                <v-avatar><v-img :src="`${url}/customers/image/${item.image}`"></v-img></v-avatar>
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.tel }}</td>
              <td>{{ item.point }}</td>

              <td>
                <v-btn class="mr-5" color="yellow" @click="customerStore.editedCustomer(item)"
                  >Edit</v-btn
                ><v-btn color="red" @click="deleteCustomer(item.id + '')">Delete</v-btn>
              </td>
            </tr>
           
          </tbody>
          <tbody v-if="customers.length == 0" >
          <tr >
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
        </v-table>
      </v-card-title>
    </v-card>
  </v-container>
</template>
