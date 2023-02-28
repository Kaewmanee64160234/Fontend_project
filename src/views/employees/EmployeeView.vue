<script setup lang="ts">
import EmployeeDialog from '@/components/employee/EmployeeDialog.vue';
import { useEmployeeStore } from '@/store/employee.store';
import { onMounted, ref } from 'vue';
import type Employee from '@/store/types/employee.type'

const employeeStore = useEmployeeStore();
const url = import.meta.env.VITE_URL_PORT
onMounted(() => {
  console.log(url)
    employeeStore.getEmployees();
});
const deleteEmployee = (id:string) => {
  employeeStore.deleteEmployee(id);
}
</script>
<template>
    <employee-dialog></employee-dialog>

  <v-container>
   
    <v-btn color="green" @click="employeeStore.dialog = !employeeStore.dialog">Add new employee</v-btn>
      <v-table  class="text-center">
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
      </tr>
    </thead>
    <tbody >
      <tr v-for="item of employeeStore.employees" :key="item.id" class="text-center">
        <td> <v-avatar ><v-img   :src="`${url}/employees/image/${item.image}`"></v-img></v-avatar></td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.tel }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.position }}</td>
        <td>{{ item.hourly }}</td>
        <td>
          <v-btn class="mr-5" 
           color="yellow" @click="employeeStore.editedEmployee(item)">Edit</v-btn
          ><v-btn color="red" @click="deleteEmployee(item.id+'')">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
    
  </v-container>
   

</template>
