<script setup lang="ts">
import router from '@/router'
import { useEmployeeStore } from '@/store/employee.store'
import type Employee from '@/store/types/employee.type'
import type User from '@/store/types/user.type'
import { onMounted, ref } from 'vue'
import type { VForm } from 'vuetify/components'
const employeeStore = useEmployeeStore()
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))
onMounted(() => {
  if (employee.value.position === 'employee') {
    router.push('/employee/login')
  }
})
const goTo = (index: string) => {
  router.push(`/manager/employee/${index}`)
}

onMounted(async () => {
  await employeeStore.getEmployees()
})
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-container>
    <v-card>
      <v-card-title>
        Manager
        <v-spacer> </v-spacer>

        <v-table class="text-center mt-5">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Full Time</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center mr-5"
              style="justify-content: center"
              v-for="(item, index) in employeeStore.employees"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <span
                  :class="
                    item.fullTime
                      ? 'bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full  dark:bg-gray-700 dark:text-blue-400 '
                      : 'bg-indigo-100 text-indigo-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full  dark:bg-gray-700 dark:text-blue-400'
                  "
                >
                  <svg
                    aria-hidden="true"
                    class="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ item.fullTime ? 'Full Time' : 'Part Time' }}
                </span>
              </td>
              <td>{{ item.position }}</td>

              <td>
                <v-btn
                  class="mdi mr-2 mdi-eye"
                  style="color: white"
                  color="blue-lighten-1"
                  @click="goTo(item.id + '')"
                >
                  History
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-container width="100%" justify="center">
          <v-pagination
            justify="center"
            v-model="employeeStore.page"
            :length="employeeStore.lastPage"
            rounded="circle"
          ></v-pagination>
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>
