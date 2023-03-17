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
const employee = ref<Employee>(JSON.parse(data.value))

onMounted(async () => {
    await employeeStore.getAllSummarySalary();
    console.log(employeeStore.getAllSummarySalary);

});


</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <v-container>
        <v-card>
            <v-card-title>
                Manager
                <v-spacer> </v-spacer>
                <v-text-field style="width: 20%" variant="solo" color="deep-purple-accent-4" class="mt-7" density="compact"
                    append-inner-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-table class="text-center mt-5">
                    <thead>
                        <tr>
                            <th>ID Employee</th>
                            <th>SS Date</th>
                            <th>Hour</th>
                            <th>Salary</th>
                            <th>CheckInout</th>
                           

                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center mr-5 " style="justify-content: center"
                            v-for="(item, index) in employeeStore.summary_salaries" :key="index">
                            <td>{{ item.id }}</td>
                            <td>{{ item.ss_date }}</td>
                            <td>{{ item.hour}}</td>
                            <td>{{ item.salary }}</td>
     
                          
                        </tr>


                    </tbody>

                </v-table>
            </v-card-title>
        </v-card>
    </v-container>
</template>
