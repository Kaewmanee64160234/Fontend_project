<script setup lang="ts">
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useEmployeeStore } from '@/store/employee.store'
import { useManageTime } from '@/store/manageDate'
import type Employee from '@/store/types/employee.type'
import type User from '@/store/types/user.type'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { VForm } from 'vuetify/components'
const url = import.meta.env.VITE_URL_PORT
const employeeStore = useEmployeeStore()
const manageTimeStore = useManageTime()
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))
const route = useRoute()
const id = ref(route.params.idSS)
// const idEmp = ref(route.path);

onMounted(async () => {
  await employeeStore.getOneSummaryBySSID(id.value + '')

})
const date = (index: string) => {
  let dd = new Date(index);
  let date = { date: '', mouth: '', year: '', hour: '', minute: '', second: '' }
  date.year = dd.getFullYear() + ''
  date.date = dd.getDate() + ''
  date.mouth = dd.getMonth() + ''
  date.minute = '' + dd.getMinutes()
  date.hour = '' + dd.getHours()
  date.second = '' + dd.getSeconds()
  if (dd.getDate() < 10) {
    date.date = '0' + dd.getDate()
  } if (dd.getMonth() < 10) {
    date.mouth = '0' + dd.getMonth()
  }
  if (dd.getHours() < 10) {
    date.hour = '0' + dd.getHours()
  }
  if (dd.getMinutes() < 10) {
    date.minute = '0' + dd.getHours()
  }
  if (dd.getSeconds() < 10) {
    date.second = dd.getSeconds() + '0'
  }
  return date;

}
</script>

<template>
          <v-row class="ml-5 mt-5" style="float:left">
  <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" value="summary salary" to="/manager/employee/:idEmp"></v-btn>
</v-row>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-container>
    <v-card>

      <v-card-text width="100vw" style="height: 90vh ;">
        <v-row class="text-center" cols="12">
          <v-col class="title" md="4">
            <v-container style="height: 100%">
              <v-row class="profile" style="height: 25%">
                <v-col>
                  <v-container>
                    <v-avatar size="100"><v-img :src="`${url}/employees/image/${   employeeStore.summary_salary.checkInOut[0].employee?.image}`"></v-img></v-avatar>
                    <div class="text-subtitle-2 mt-3">
                      {{  employeeStore.summary_salary.checkInOut[0].employee?.name }}
   

                    </div>
                  </v-container>
                </v-col>
              </v-row>
              <v-row style="height: 30%">
                <v-col>
                  <v-card style="background-color: white">
                    <v-card-text style="text-align: left">
                      <ul class=" text-gray-500 list-disc list-inside dark:text-gray-400 ">
                        <li>
                          👤 Name : {{ employeeStore.summary_salary.checkInOut[0].employee?.name }}
                        </li>
                        <br />
                        <li>
                          📩 Email : {{ employeeStore.summary_salary.checkInOut[0].employee?.email }}
                        </li>
                        <br />
                        <li>
                          🗃️ Position : {{ employeeStore.summary_salary.checkInOut[0].employee?.position }}
                        </li>
                        <br />
                        <li>
                          🕐 hourly : {{ employeeStore.summary_salary.checkInOut[0].employee?.hourly }} ฿
                        </li>
                      </ul>

                      <!-- <p>👤 Name : {{ employeeStore.summary_salary.checkInOut[0].employee?.name }}</p>
                          <br />
                          <p>📩 Email: {{ employeeStore.summary_salary.checkInOut[0].employee?.email }}</p>
                          <br />
                          <p>🗃️ Position : {{ employeeStore.summary_salary.checkInOut[0].employee?.position }}</p>
                          <br />
                          <p>🕐 hourly : {{ employeeStore.summary_salary.checkInOut[0].employee?.hourly }} ฿</p> -->
                    </v-card-text>
                </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col class="detail">
            <v-container style="height: 100%">
              <v-row style="height: 13%">
                <v-row class="text-center">
                  <v-col class="detail-emp">
                    <v-card height="100px" width="300px" style="border-radius: 15px; background-color: #def5e5">
                      <v-card-title class="text-left">
                        <h7> {{ employeeStore.summary_salary.salary }} ฿ </h7> <br />
                        <h7 style="font-size: 15px; color: #6d9886">💸 Your Salary </h7>
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col class="detail-emp">
                    <v-card height="100px" width="300px" style="border-radius: 15px; background-color: #ffe3e1">
                      <v-card-title class="text-left">
                        <h7> {{ employeeStore.summary_salary.hour }} hour </h7> <br />
                        <h7 style="font-size: 15px; color: #ff9494">🕒 Total work </h7>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-row>
              <v-col class="detail">
                <v-container style="height: 60%" >
                  <div style="height: 63vh; overflow-y: auto;" class="scroll ">
                  <v-table fixed-header class="text-center mt-5 "
                    style="justify-content: center; ">
                    <thead style="justify-content: center">
                      <tr>
                        <th>Date</th>
                        <th>Time in</th>
                        <th>Time out</th>
                        <th>Total hour</th>
                      </tr>
                    </thead>
                    <tbody >
                      <tr class="text-center mr-5" style="justify-content: center  overflow-y: auto;"
                        v-for="(item, index) in employeeStore.summary_salary.checkInOut" :key="index">
                        <td>{{ date(item.time_in + '').date + '/' + manageTimeStore.monthNum[new Date(item.time_in
                          +
                          '').getMonth()] + '/' +
                          new
                            Date(item.time_in + '').getFullYear() }}</td>
                        <!-- <td>{{ new Date(item.time_in + '').getDate() + '/' + new Date(item.time_in + '').getMonth() + '/' + new
                            Date(item.time_in + '').getFullYear() }}</td> -->
                        <td>{{ new Date(item.time_in + '').getHours() + ':' + new Date(item.time_in + '').getMinutes() +
                          ':' + new
                            Date(item.time_in + '').getSeconds() }}</td>
                        <td>{{ new Date(item.time_out + '').getHours() + ':' + new Date(item.time_out + '').getMinutes() +
                          ':' + new
                            Date(item.time_out + '').getSeconds() }}</td>
                        <td>{{ item.total_hour }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
                </v-container>
              </v-col>

              <v-container width="100%" justify="center">
                <v-pagination justify="center" v-model="employeeStore.page" :length="employeeStore.lastPage"
                  rounded="circle"></v-pagination>
              </v-container>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
.title {
  background-color: #F9F5E7;
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

.scroll {
  overflow: scroll;
}

.scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 999;
}
</style>