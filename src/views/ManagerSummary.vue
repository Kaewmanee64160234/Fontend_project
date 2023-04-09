
<script setup lang="ts">
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import router from '@/router'
import { useEmployeeStore } from '@/store/employee.store'
import { useManageTime } from '@/store/manageDate'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const employeeStore = useEmployeeStore()
const route = useRoute()
const id = ref(route.params.idEmp)
const manageTime = useManageTime()
const url = import.meta.env.VITE_URL_PORT
const goTo = (idSS: string) => {
  router.push(`/manager/employee/${id.value}/cio/${idSS}`)
}
onMounted(async () => {
  await employeeStore.getSummarySalaryEmp(id.value + '')
})
</script>

<template>
        <v-row class="ml-5 mt-5" style="float:left">
  <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" value="manager-employees" to="/manager/employees"></v-btn>
</v-row>
  <v-container>
    <v-card>
      <v-card-text width="100vw" style="height: 90vh; background-color: #fefcf3">
        <v-card-text
          style="text-align: center; font-size: 28px; font-family: Georgia, serif; height: 17%"
        >
          Summary Salary
        </v-card-text>
        
        <v-row class="profile" style="height: 35%; text-align: right">
          <v-col>
            <v-container style="text-align: right">
              <v-col>
                <v-avatar class="md-10 mr-15" size="100"
                  ><v-img
                    :src="`${url}/employees/image/${employeeStore.summary_salaries[0].checkInOut[0].employee?.image}`"
                  ></v-img
                ></v-avatar>
                <br />
                <br />
                <div class="text-subtitle-2 md-2 mr-20" style="text-align: right; font-size: 20px">
                  {{ employeeStore.summary_salaries[0].checkInOut[0].employee?.name }}
                </div>
              </v-col>
            </v-container>
          </v-col>

          <div style="border-left: 3px solid #867070; height: 185px; text-align: center"></div>

          <v-col>
            <v-card-text class="mt-10 ml-9" style="text-align: left; font-size: 14px">
              <ul class="text-black-500 list-disc list-inside dark:text-gray-400">
                <li>
                  👤 Name : {{ employeeStore.summary_salaries[0].checkInOut[0].employee?.name }}
                </li>
                <br />
                <li>
                  📩 Email : {{ employeeStore.summary_salaries[0].checkInOut[0].employee?.email }}
                </li>
              </ul>
            </v-card-text>
          </v-col>
        </v-row>
        <div class="scroll">
        <div class="mt-3 ml-5 mr-5 text-center" v-for="(item, index) in employeeStore.summary_salaries" :key="index">

        <v-row class="text-center" style="max-width: 1200px" cols="12">
          <v-row>
            <v-col>
              <v-container style="height: 70%">
                <v-row style="height: 20%">
                  <v-row class="text-center" style="height: 10%">
                    <v-col>
                      <div
                        class="stats shadow"
                        style="
                          background-color: white;
                          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
                            rgba(0, 0, 0, 0.2) 0px 3px 5px;
                        "
                      >
                        <div class="stat place-items-center mt-6">
                          <dl
                            class="grid max-w-screen-xl grid-cols-2 gap-20 p-4 sm:grid-cols-3 xl:grid-cols-5 dark:text-white sm:p-8"
                          >
                            <!-- grid max-w-screen-xl grid-cols-2 gap-8 p-4  sm:grid-cols-3 xl:grid-cols-5 dark:text-white sm:p-8 -->
                            <div class="flex flex-col items-center justify-center">
                              <dt
                                class="mb-2 text-3xl font-extrabold text-brown-lighten-1"
                                style="font-size: 25px; font-family: sans-serif; text-align: center"
                              >
                              {{
                manageTime.month[parseInt(new Date(item.ss_date + '').getMonth().toString())] +
                '/' +
                new Date(item.ss_date + '').getFullYear()
              }}
                              </dt>
                              <dd class="text-gray-500 dark:text-gray-400" style="font-size: 15px">
                                Month/Year
                              </dd>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                              <dt
                                class="mb-2 text-3xl font-extrabold text-blue-grey-darken-2"
                                style="font-size: 25px; font-family: sans-serif"
                              >
                                 {{ item.checkInOut[0]?.employee.fullTime ?  item.checkInOut[0]?.employee.salary :   item.salary}} ฿
                              </dt>
                              <dd class="text-gray-500 dark:text-gray-400">SALARY</dd>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                              <dt
                                class="mb-2 text-3xl font-extrabold"
                                style="font-size: 29px; font-family: sans-serif"
                              >
                                <span
                                  :class=" item.paid ?'inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300':'inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'"
                                >
                                  <span :class="item.paid ?'w-2 h-2 mr-1 bg-green-500 rounded-full':'w-2 h-2 mr-1 bg-red-500 rounded-full'"></span>
                                  {{ item.paid ? 'PAID' : 'NOT PAID' }}

                                </span>
                              </dt>
                              <dd class="text-gray-500 dark:text-gray-400">STATUS</dd>
                              <!-- <dt class="mb-2 text-3xl font-extrabold"                                                          </dd> -->
                            </div>
                            <div class="flex flex-col items-center justify-center">
                              <v-btn @click="goTo(item.id+'')"
                                class="mdi mdi-eye"
                                style="background-color: #0081c9; color: white"
                              >
                                History
                              </v-btn>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                              <v-btn  v-if="!item.paid" @click="employeeStore.updatePaidStatusSS(item.id+'')"
                                class="mdi mdi-hand-coin"
                                style="background-color: #14c38e; color: white"
                              >
                                Paid</v-btn
                              >
                              <v-btn disabled  v-if="item.paid"
                                class="mdi mdi-hand-coin"
                                style="background-color: #14c38e; color: white"
                              >
                                Paid</v-btn
                              >
                            </div>
                          </dl>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-row>
        </div>
      </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
.title {
  background-color: #faf8f1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px;
  /* height: 100vh; */
}

.detail-emp {
  /* width: 100%; */
  /* display: flex; */
  justify-content: center;
}

.detail {
  width: 70 vw;
}

.scroll {
  overflow: scroll;
}

.scroll::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #faf8f1;
  border-radius: 999px;
}
</style>
