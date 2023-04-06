
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
    <v-container>
        <v-card>
            <v-card-text width="100vw" style="height: 90vh ;">
                <v-row class="text-center" cols="12">
                    <v-col class="title" md="4">
                        <v-container style="height: 100%">
                            <v-row class="profile" style="height: 25%;">
                                <v-col>
                                    <v-container>

                                        <v-avatar size="100"><v-img
                                                :src="`${url}/employees/image/${employee.image}`"></v-img></v-avatar>
                                        <br />
                                        <div class="text-subtitle-2 mt-3">{{ employee.name }}</div>
                                    </v-container>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col >

                                    <v-card-text style="text-align: left;">
                                        <ul
                                            class=" text-gray-500 list-disc list-inside dark:text-gray-400 ">
                                            <li>
                                                👤 Name : {{ employeeStore.editEmployee.name }}
                                            </li>
                                            <br/>
                                            <li>
                                                📩 Email : {{ employeeStore.editEmployee.email }}
                                            </li>
                                        </ul>

                                    </v-card-text>


                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>

                    <v-col class="detail">
                        <v-container style="height: 70%; ">
                            <v-row style="height: 15%">
                                <v-card-text style="text-align: left; font-size:25px; font-family: Georgia, serif;">
                                    Summary Salary
                                </v-card-text>
                                <v-row class="text-center" style="height: 10%;">
                                    <v-col>
                                        <div class="stats shadow"
                                            style="background-color:white; box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.20) 0px 3px 5px;;">
                                            <div class="stat place-items-center">
                                                <dl
                                                    class="grid max-w-screen-xl grid-cols-2 gap-8 p-4  sm:grid-cols-3 xl:grid-cols-5 dark:text-white sm:p-8">
                                                    <div class="flex flex-col items-center justify-center ">
                                                        <dt class="mb-2 text-3xl font-extrabold text-brown-lighten-1"
                                                            style="font-size: 25px; font-family: sans-serif; text-align: center; ">
                                                            2023/04</dt>
                                                        <dd class="text-gray-500 dark:text-gray-400"
                                                            style="font-size: 15px;">YYYY/MM </dd>

                                                    </div>
                                                    <div class="flex flex-col items-center justify-center ">
                                                        <dt class="mb-2 text-3xl font-extrabold text-blue-grey-darken-2"
                                                            style="font-size: 25px; font-family: sans-serif;">{{
                                                                employeeStore.summary_salary.salary }} 1222฿ </dt>
                                                        <dd class="text-gray-500 dark:text-gray-400">SALARY</dd>
                                                    </div>
                                                    <div class="flex flex-col items-center justify-center">
                                                        <dt class="mb-2 text-3xl font-extrabold"
                                                            style="font-size: 29px; font-family: sans-serif;"><span
                                                                class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                                <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                                                PAID
                                                            </span></dt>
                                                        <dd class="text-gray-500 dark:text-gray-400">STATUS
                                                        </dd>
                                                        <!-- <dt class="mb-2 text-3xl font-extrabold"
                                                            style="font-size: 29px; font-family: sans-serif;"><span
                                                                class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                                                <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                                                                NO PAID
                                                            </span></dt>
                                                        <dd class="text-gray-500 dark:text-gray-400">STATUS
                                                        </dd> -->
                                                    </div>
                                                    <div class="flex flex-col items-center justify-center">
                                                        <v-btn class="mdi  mdi-eye"
                                                            style="background-color: #0081C9; color: white; "> History
                                                        </v-btn>

                                                    </div>
                                                    <div class="flex flex-col items-center justify-center">
                                                        <v-btn class="mdi mdi-hand-coin "
                                                            style="background-color: #14C38E; color: white; "> Paid</v-btn>

                                                    </div>


                                                </dl>

                                            </div>

                                        </div>

                                    </v-col>

                                </v-row>





                            </v-row>
                            <v-col class="detail">
                                <v-container style="height: 60%; ">

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
    background-color: #FAF8F1;
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

