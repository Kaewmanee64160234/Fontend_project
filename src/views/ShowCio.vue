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
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const email = ref('')
const name = ref('')
const loading = ref(false)
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))
const route = useRoute()
const id = ref(route.params.id)
const manageTime = useManageTime()

onMounted(async () => {
  await employeeStore.getOneSummarySalaryEmp(id.value + '')
})
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-container>
    <!-- {{ employeeStore.summary_salaries }} -->

    <div v-for="(item, index) in employeeStore.summary_salaries" :key="index">
      <v-container>
        <div
          class="summary stats shadow"
          style="background-color: white; box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 5px"
        >

          <div class="stat">
            <div
              class="stat-value text-brown-lighten-1"
              style="font-size: 29px; font-family: sans-serif"
            >
              {{
                manageTime.month[parseInt(new Date(item.ss_date + '').getMonth().toString())] +
                '/' +
                new Date(item.ss_date + '').getFullYear()
              }}
            </div>
            <br />
            <div class="stat-desc" style="font-size: 15px">Month/Year</div>
          </div>
          <div class="salary stat">
            <div
              class="stat-value text-blue-grey-darken-2"
              style="font-size: 29px; font-family: sans-serif"
            >
              {{ item.checkInOut[0]?.employee.fullTime ?  item.checkInOut[0]?.employee.salary :   item.salary}} ฿
            </div>
            <br />
            <div class="stat-desc">SALARY</div>
          </div>
          <div class="stat">
            <div class="stat-value" style="font-size: 29px; font-family: sans-serif">
              <span
                :class="
                  item.paid
                    ? 'inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'
                    : 'inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'
                "
              >
                <span
                  :class="
                    item.paid
                      ? 'w-2 h-2 mr-1 bg-green-500 rounded-full'
                      : 'w-2 h-2 mr-1 bg-red-500 rounded-full'
                  "
                ></span>
                {{ item.paid ? 'PAID' : 'NOT PAID' }}
              </span>
            </div>
            <br />
            <div class="stat-desc">Status Paid</div>
          </div>
          <div class="stat">
            <v-btn class="mdi mdi-hand-coin" style="background-color: #14c38e; color: white">
              Paid</v-btn
            >
          </div>
        </div>
      </v-container>
    </div>
  </v-container>
</template>
<style scoped>
.title {
  background-color: #fff5e1;
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
