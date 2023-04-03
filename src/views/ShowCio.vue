<script setup lang="ts">
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useEmployeeStore } from '@/store/employee.store'
import type Employee from '@/store/types/employee.type'
import type User from '@/store/types/user.type'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { VForm } from 'vuetify/components'
const url = import.meta.env.VITE_URL_PORT
const employeeStore = useEmployeeStore()
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const email = ref('')
const name = ref('')
const loading = ref(false)
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))
const route = useRoute();
const id = ref(route.params.id);

onMounted(async () => {
  await employeeStore.getOneSummarySalaryEmp(id.value + '')

})
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-container>
    <v-card>
      {{ employeeStore.summary_salaries }}
  <div v-for="(item,index) in employeeStore.summary_salaries" :key="index">
    <div class="stats shadow">
  <div class="stat">
    <div class="stat-figure text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </div>
    <div class="stat-title">Total Likes</div>
    <div class="stat-value text-primary">{{ item.hour }}</div>
    <div class="stat-desc">21% more than last month</div>
  </div>
  
  <div class="stat">
    <div class="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <div class="stat-title">Page Views</div>
    <div class="stat-value text-secondary">2.6M</div>
    <div class="stat-desc">21% more than last month</div>
  </div>
  
  <div class="stat">
    <div class="stat-figure text-secondary">
      <div class="avatar online">
        <div class="w-16 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
    </div>
    <div class="stat-value">86%</div>
    <div class="stat-title">Tasks done</div>
    <div class="stat-desc text-secondary">31 tasks remaining</div>
  </div>
  
</div>
  </div>

     
      <!-- <v-card-text width="100vw" style="height: 90vh ;">
        <v-row class="text-center" cols="12">
          <v-col class="title" md="4">
            <v-container style="height: 100%">
              <v-row class="profile" style="height: 25%">
                <v-col>
                  <v-container>
                    <v-avatar size="100"><v-img :src="`${url}/employees/image/${employee.image}`"></v-img></v-avatar>
                    <div class="text-subtitle-2 mt-3">{{ employeeStore.summary_salary.employee?.name }}</div>
                  </v-container>
                </v-col>
              </v-row>

              <v-row style="height: 30%">
                <v-col>
                  <v-card style="background-color: white">
                    <v-card-text style="text-align: center">
                      <p>👤 Name : {{ employeeStore.summary_salary.checkInOut[0].employee?.name }}</p>
                      <br />
                      <p>📩 Email: {{ employeeStore.summary_salary.checkInOut[0].employee?.email }}</p>
                      <br />
                      <p>🗃️ Position : {{ employeeStore.summary_salary.checkInOut[0].employee?.position }}</p>
                      <br />
                      <p>🕐 hourly : {{ employeeStore.summary_salary.checkInOut[0].employee?.hourly }} ฿</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

            </v-container>
          </v-col>

          <v-col class="detail">
            <v-container style="height: 100%; ">
              <v-row style="height: 13%">
                <v-row class="text-center">
                  <v-col class="detail-emp">
                    <v-card height="100px" width="300px" style=" border-radius: 15px; background-color: #DEF5E5;">
                      <v-card-title class="text-left">
                        <h7> {{ employeeStore.summary_salary.salary }} ฿ </h7> <br />
                        <h7 style="font-size: 15px; color: #6D9886">💸 Your Salary </h7>
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col class="detail-emp">
                    <v-card height="100px" width="300px" style=" border-radius: 15px; background-color: #FFE3E1;">
                      <v-card-title class="text-left">
                        <h7> {{ employeeStore.summary_salary.hour }} hour </h7> <br />
                        <h7 style="font-size: 15px; color: #FF9494">🕒 Total work </h7>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-row>
              <v-col class="detail">
                <v-container style="height: 60%; ">
                  <VTable  fixed-header height="600px" class="text-center mt-5" style="justify-content: center; overflow-y: auto;">
                    <thead style="justify-content: center; ">
                      <tr>
                        <th>Time in</th>
                        <th>Time out</th>
                        <th>Total hour</th>
                      </tr>
                    </thead>
                    <tbody style=" overflow-y: auto;">
                      <tr class="text-center mr-5" style="justify-content: center  overflow-y: auto;"
                        v-for="(item, index) in employeeStore.summary_salary.checkInOut" :key="index">
                        <td>{{ item.time_in }}</td>
                        <td>{{ item.time_out }}</td>
                        <td>{{ item.total_hour }}</td>
                      </tr>
                    </tbody>
                  </VTable>

                </v-container>
              </v-col>

              <v-container width="100%" justify="center">

                <v-pagination justify="center" v-model="employeeStore.page" :length="employeeStore.lastPage"
                  rounded="circle"></v-pagination>

              </v-container>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text> -->
    </v-card>
  </v-container>
</template>
<style scoped>
.title {
  background-color: #FFF5E1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px;
  height: 100vh;
}

.detail-emp {
  width: 100%;
  display: flex;
  justify-content: center;
}

.detail {
  width: 70 vw;
}
</style>
