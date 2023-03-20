<script setup lang="ts">

import { useEmployeeStore } from '@/store/employee.store'
import type Employee from '@/store/types/employee.type'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import type { VForm } from 'vuetify/components'
const url = import.meta.env.VITE_URL_PORT
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const email = ref('')
const name = ref('')
const loading = ref(false);
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))
  const employeeStore = useEmployeeStore()

const route = useRoute();
const id = ref(route.params.id);

onMounted(() => {
    employeeStore.getOneEmployee(employee.value.id + '')
    
});
</script>
<template>
    
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-container>
    <v-card>
      <v-card-text width="100vw" style="height: 90vh ;">
        <v-row class="text-center" cols="12" >
          <v-col class="title" md="4">
            <v-container style="height: 100%">
              <v-row class="profile" style="height: 25%">
                <v-col>
                  <v-container>
                    <v-avatar size="100"
                      ><v-img :src="`${url}/employees/image/${employee.image}`"></v-img
                    ></v-avatar>
                    <div class="text-subtitle-2 mt-3">{{ employee.name }}</div></v-container
                  >
                </v-col>
              </v-row>
              <hr style="border: 2px solid #e4dccf; border-radius: 50px" />
              <v-row style="height: 30%">
                <v-col class="detail-emp">
                  <v-card variant="outlined">
                    <v-card-text  style="text-align: left">
                        <p>📛 Name : {{ employeeStore.editEmployee.name }}</p>
                        <p>📨 Email : {{ employeeStore.editEmployee.email }}</p>
                        <p>🗃️ Position : {{ employeeStore.editEmployee.position }}</p>
                        <p>🗃️ hourly : {{ employeeStore.editEmployee.hourly }} ฿</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row style="height: 30%">
                <v-row>
                  <v-col class="detail-emp">
                    <v-card height="80px" width="250px">
                      <v-card-title class="text-left">
                        <h7> {{ employeeStore.summary_salary.hour }} hour </h7> <br />
                        <h7 style="font-size: 15px; color: #ff9e9e">🕒 Total work </h7>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-row>
              <v-row class="button" style="height: 10%">
               
              </v-row>
            </v-container>
          </v-col>

          <v-col class="detail">
            <v-container>
              <VTable class="text-center mt-5" style="justify-content: center; overflow-y: auto">
                <thead style="justify-content: center; overflow-y: auto">
                  <tr>
                    <th>Time in</th>
                    <th>Time out</th>
                    <th>Total hour</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-center mr-5"
                    style="justify-content: center"
                    v-for="(item, index) in employeeStore.editEmployee.check_in_outs"
                    :key="index"
                  >
                    <td>{{ item.time_in }}</td>
                    <td>{{ item.time_out }}</td>
                    <td>{{ item.total_hour }}</td>
                  </tr>
                </tbody>
              </VTable>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.title {
  background-color: rgb(250, 235, 215, 0.5);
  height: 100vh;
}
.detail-emp {
  width: 100%;
  display: flex;
  justify-content: center;
}
.detail {
  width: 70vw;
}
</style>

