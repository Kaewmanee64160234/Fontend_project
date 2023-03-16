<script setup lang="ts">
import { useEmployeeStore } from '@/store/employee.store'
import type Employee from '@/store/types/employee.type'
import type User from '@/store/types/user.type'
import { onMounted, ref } from 'vue'
import type { VForm } from 'vuetify/components'
const url = import.meta.env.VITE_URL_PORT
const employeeStore = useEmployeeStore()
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const email = ref('')
const name = ref('')
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee >(JSON.parse(data.value))

onMounted(async () => {
   await employeeStore.getOneEmployee(employee.value.id+'')
   console.log(employeeStore.editEmployee)
});
</script>

<template>
  <v-container>
    <v-card style="background-color: #f1dec9">
      <v-card-title>
        Employee
        <v-spacer> </v-spacer>

        <v-table class="text-center mt-5" style="background-color: #f1dec9">
          <v-row>
            <v-col colspan="2">
              <v-avatar size="80"
                ><v-img :src="`${url}/employees/image/${employee.image}`"></v-img
              ></v-avatar>
              <div class="d-flex align-center flex-column">
                <div class="text-subtitle-2 mt-3">{{ employee.name }}</div>
                <v-card class="mt-5" width="350" text="This is content">
                  <v-card-title>
                    <div class="text-left">
                      <p>ชื่อ : {{ employee.name }}</p>
                      <p>email : {{ employee.email }}</p>
                      <p>ตำแหน่ง : {{ employee.position }}</p>
                    </div>
                  </v-card-title>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-table>

        <v-table height="400px">
          <thead style="background-color: #f1dec9">
            <tr>
              <td></td>

              <td >
                <v-btn class="mdi mr-2 mdi-delete" style="float: right; color: white" color="red"
                  >Checkout</v-btn
                >
                <v-btn class="mdi mr-2 mdi-delete" style="float: right; color: white" color="blue"
                  >Checkin</v-btn
                >
              </td>
            </tr>
          </thead>
          <thead>
            <tr 
            >
            <td class="text-center mr-5">Time in</td>
              <td class="text-center mr-5">Time out</td>
              <td class="text-center mr-5">Total hour</td>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in employeeStore.editEmployee.check_in_outs" :key="index">
              <td>{{ item.time_in}}</td>
              <td>{{ item.time_out}}</td>
              <td>{{ item.total_hour}}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-title>
    </v-card>
  </v-container>
</template>
