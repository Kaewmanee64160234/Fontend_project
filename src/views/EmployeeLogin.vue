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

const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))

onMounted(async () => {
  await employeeStore.getOneEmployee(employee.value.id + '')
  await employeeStore.getOneSummarySalaryEmp(employee.value.id + '')
  // console.log(employeeStore.editEmployee)
})
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
<v-container>
  <v-card>
    <v-card-text width="100vw" style="height: 90vh ;">
      <v-row class="text-center" cols="12">
        <v-col class="title" md="4">
          <v-container style="height: 100%">
            <v-row class="profile" style="height: 25%;">
              <v-col>
                <v-container>
                    <v-avatar size="100"><v-img :src="`${url}/employees/image/${employee.image}`"></v-img></v-avatar>
                    <div class="text-subtitle-2 mt-3">{{ employee.name }}</div>
                  </v-container>
                </v-col>
              </v-row>
              <!-- <v-row style="height: 30%">
                    <v-col>
                      <v-card style="background-color: white">
                        <v-card-text style="text-align: center">

                          <p>👤 Name : {{ employeeStore.editEmployee.name }}</p>
                          <br />
                          <p>📩 Email : {{ employeeStore.editEmployee.email }}</p>
                          <br />
                          <p>🗃️ Position : {{ employeeStore.editEmployee.position }}</p>
                          <br />
                          <p>🕐 hourly : {{ employeeStore.editEmployee.hourly }} ฿</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row> -->
              <v-row style="height: 30%">
                <v-col>
                  <v-card>
                    <v-card-text style="text-align: left;">
                      <ul class=" text-gray-500 list-disc list-inside dark:text-gray-400 ">
                        <li>
                          👤 Name : {{ employeeStore.editEmployee.name }}
                        </li>
                        <br/>
                        <li>
                          📩 Email : {{ employeeStore.editEmployee.email }}
                        </li>
                        <br/>
                        <li>
                          🗃️ Position : {{ employeeStore.editEmployee.position }}
                        </li>
                        <br/>
                        <li>
                          🕐 hourly : {{ employeeStore.editEmployee.hourly }} ฿
                        </li>
                      </ul>

                    </v-card-text>
                  </v-card>


                </v-col>
              </v-row>

              <v-row class="button" style="height: 50%; ">
                <v-col>
                  <v-btn v-if="employeeStore.checkIn === true" class="mdi mr-2 mdi-checkbox-marked-circle" width="310px"
                    height="50px" style="float: right; color: white" color="green"
                    @click="employeeStore.empCheckIn(employeeStore.editEmployee.id!)">Checkin </v-btn>
                  <v-btn v-else class="mdi mr-2 mdi-close-circle" width="310px" height="50px"
                    style="float: right; color: white" color="red" @click="employeeStore.empCheckOut(employee.id + '')">
                    Checkout</v-btn>

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
                  <VTable fixed-header height="370px" class="text-center mt-5;" style="justify-content: center; ">
                    <thead style="justify-content: center;  ">
                      <tr>
                        <th>Time in</th>
                        <th>Time out</th>
                        <th>Total hour</th>
                      </tr>
                    </thead>
                    <tbody style=" overflow-y: auto;">
                      <tr class="text-center mr-5" style="justify-content: center;  overflow-y: auto;"
                        v-for="(item, index) in employeeStore.editEmployee.check_in_outs" :key="index">
                        <td>{{  new Date(item.time_in+'').getDate()+'/'+new Date(item.time_in+'').getMonth()+'/'+new Date(item.time_in+'').getFullYear() }}</td>
                        <td>{{  new Date(item.time_out+'').getDate()+'/'+new Date(item.time_out+'').getMonth()+'/'+new Date(item.time_out+'').getFullYear()  }}</td>
                        <td>{{ item.total_hour }}</td>
                      </tr>
                    </tbody>
                  </VTable>
                </v-container>

              </v-col>

            </v-container>

          </v-col>

        </v-row>
      </v-card-text>
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
