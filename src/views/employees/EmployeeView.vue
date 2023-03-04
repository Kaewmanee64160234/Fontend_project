<script setup lang="ts">
import EmployeeDialog from '@/components/employee/EmployeeDialog.vue'
import { useEmployeeStore } from '@/store/employee.store'
import { computed, onMounted, ref } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

// import type Customer from '@/store/types/customer.type'
const confirmDlg = ref()
const employeeStore = useEmployeeStore()
const url = import.meta.env.VITE_URL_PORT


const employees = computed(() => {
  if (!employeeStore.search) {
    return employeeStore.employees;
  } else {
    return employeeStore.employees.filter((employee) => {
      return employee.name.toLocaleLowerCase().includes( employeeStore.search
      )
    });
  }
});
onMounted(() => {
  console.log(url)
  employeeStore.getEmployees()
})
const deleteEmployee = async (id: string) => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?`,
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
        Employee
        <v-btn
          class="mdi mdi-plus"
          style="float: right; color: white"
          color="#8ad879"
          @click="employeeStore.dialog = !employeeStore.dialog"
          >Add new employee</v-btn
        >
        <v-btn class="mdi mr-2  mdi-delete" style="float: right; color: white" color="red" @click="deleteAllEmployees">Delete All</v-btn>
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
          v-model="employeeStore.search"
        ></v-text-field>
        <v-table class="text-center mt-5">
          <thead>
            <tr>
              <th>
                <v-checkbox
                  class="d-flex pa-4"
                  color="indigo"
                  v-model="employeeStore.allSelected"
                  @click="employeeStore.selectEmployeeAll"
                ></v-checkbox>
              </th>
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
          <tbody>
            <tr v-for="item of employees" :key="item.id" class="text-center">
              <td>
                <v-checkbox
                  class="d-flex pa-4"
                  color="indigo"
                  v-model="employeeStore.selected"
                  @click="employeeStore.selectEmployee()"
                  :value="item.id+''"
                ></v-checkbox>
              </td>
              <td>
                <v-avatar size="80"><v-img :src="`${url}/employees/image/${item.image}`"></v-img></v-avatar>
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.tel }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.hourly }}</td>

              

              <td>
                <v-btn color="yellow" class="mr-5 mdi mdi-pencil" @click="employeeStore.editedEmployee(item)"
                  >Edit</v-btn
                ><v-btn color="#F55050" class="mdi mdi-delete" @click="deleteEmployee(item.id + '')">Delete</v-btn>
              </td>
            </tr>
           
          </tbody>
          <tbody v-if="employees.length == 0" >
          <tr >
            <td colspan="10" class="text-center">No data</td>
          </tr>
        </tbody>
        </v-table>
      </v-card-title>
    </v-card>
  </v-container>
</template>
