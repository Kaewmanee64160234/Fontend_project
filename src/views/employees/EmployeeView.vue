<script setup lang="ts">
import EmployeeDialog from '@/components/employee/EmployeeDialog.vue'
import { useEmployeeStore } from '@/store/employee.store'
import { computed, onMounted, ref } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

// import type Customer from '@/store/types/customer.type'
const confirmDlg = ref()
const employeeStore = useEmployeeStore()
const url = import.meta.env.VITE_URL_PORT
const loading = ref(false);


onMounted(() => {
  console.log(url)
  employeeStore.getEmployees()
})
const deleteEmployee = async (id: string) => {
  await confirmDlg.value.openDialog(
    'Please Confirm',
    `Do you want to delete this employee?`,
    'Accept',
    'Cancel'
  )
  employeeStore.deleteEmployee(id)
}

const deleteAllEmployees = async () => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบข้อมูลพนักงานใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  await employeeStore.deleteEmployees()
}
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>

  <employee-dialog></employee-dialog>
  <v-container>
    <v-card>
      <v-card-title>
        <div class="row">
          <div class="col-md-9">
            Employee
          </div>
        </div>

        <v-row class="mt-2">
          <v-col cols="3">
            <v-text-field :loading="employeeStore.loading" density="compact" variant="solo"
              v-model="employeeStore.keyword" label="Search" append-inner-icon="mdi-magnify" hide-details
              @click:append-inner="employeeStore.getEmployeeByName"></v-text-field>
          </v-col>

          <v-col>
            <v-btn class="mdi mdi-plus" style="float: right; color: white" color="#8ad879"
              @click="employeeStore.dialog = !employeeStore.dialog">Add new employee</v-btn>
          </v-col>
        </v-row>
        <v-spacer> </v-spacer>
        <v-table class="text-center mt-5">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Tel</th>
              <th>Email</th>
              <th>Position</th>
              <th>Hourly</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody v-if="employeeStore.employees.length > 0">
            <tr v-for="(item, index) in employeeStore.employees" :key="index" class="text-center">

              <td>
                <v-avatar size="80"><v-img :src="`${url}/employees/image/${item.image}`"></v-img></v-avatar>
              </td>
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.tel }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.hourly }}</td>



              <td>
                <v-btn color="#FFDD83" class="mr-5" icon="mdi-pencil"
                  @click="employeeStore.editedEmployee(item)"></v-btn><v-btn color="#F55050" class="mr-5"
                  icon="mdi-delete" @click="deleteEmployee(item.id + '')"></v-btn>
              </td>
            </tr>

          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="10" class="text-center">No data</td>
            </tr>
          </tbody>
        </v-table>
        <v-container width="100%" justify="center">

          <v-pagination justify="center" v-model="employeeStore.page" :length="employeeStore.lastPage"
            rounded="circle"></v-pagination>

        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>
