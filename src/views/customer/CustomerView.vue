<script setup lang="ts">
import CustomerDialog from '@/components/customer/CustomerDialog.vue'
import { useCustomerStore } from '@/store/customer.store'
import { computed, onMounted, ref } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

// import type Customer from '@/store/types/customer.type'
const confirmDlg = ref()
const customerStore = useCustomerStore()
const url = import.meta.env.VITE_URL_PORT


onMounted(() => {
  console.log(url)
  customerStore.getCustomers()
})
const deleteCustomer = async (id: string) => {
  await confirmDlg.value.openDialog(
    'Please Confirm',
    `Do you want to delete this customer?`,
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

  <CustomerDialog></CustomerDialog>
  <v-container>
    <v-card>
      <v-card-title>
        Customers
        <v-btn
          class="mdi mdi-plus"
          style="float: right; color: white"
          color="#8ad879"
          @click="customerStore.dialog = true"
          >Add new customer</v-btn
        >
        <v-spacer> </v-spacer>
        <v-text-field style="width: 30%;"
        :loading="customerStore.loading"
        density="compact"
        variant="solo"
        v-model="customerStore.keyword"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        hide-details
        @click:append-inner="customerStore.getCustomerByTel"
      ></v-text-field>
        <v-table class="text-center mt-5">
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
          <tbody>
            <tr v-for="(item,index) of customerStore.customers" :key="index" class="text-center">

              <td>
                <v-avatar size="80"><v-img :src="`${url}/customers/image/${item.image}`"></v-img></v-avatar>
              </td>
              <td>{{ index+1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.tel }}</td>
              <td>{{ item.point }}</td>

              <td>
                <v-btn color="#FFDD83" class="mr-5" icon="mdi-pencil" @click="customerStore.editedCustomer(item)"
                  ></v-btn
                ><v-btn color="#F55050" class="mr-5" icon="mdi-delete" @click="deleteCustomer(item.id + '')"></v-btn>
              </td>
            </tr>
           
          </tbody>
          <tbody v-if="customerStore.customers.length == 0" >
          <tr >
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
        </v-table>
        <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="customerStore.page" :length="customerStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>
