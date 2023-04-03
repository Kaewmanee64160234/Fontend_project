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
                                <v-col>
                                    <v-col>
                                        <v-card-text style="text-align: center; font-size: 16px;">
                                            <p>👤 Name : {{ employeeStore.editEmployee.name }} </p>
                                            <br />
                                            <p>📩 Email : {{ employeeStore.editEmployee.email }} </p>
                                            <br />
                                            <p>🗃️ Position : {{ employeeStore.editEmployee.position }}</p>
                                            <br />
                                            <p>🕐 hourly : {{ employeeStore.editEmployee.hourly }} ฿</p>
                                        </v-card-text>

                                    </v-col>

                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>

                    <v-col class="detail">
                        <v-container style="height: 100%; ">
                            <v-row style="height: 15%">
                                <v-card-text style="text-align: left; font-size:25px; font-family: Georgia, serif;">
                                    Summary Salary
                                </v-card-text>

                                <v-row class="text-center" style="height: 10%;">
                                    <v-col>
                                        <div class="stats shadow "
                                            style="background-color:white; box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 5px;">
                                            <div class="stat">

                                                <div class="stat-value text-brown-lighten-1 "
                                                    style="font-size: 29px; font-family: sans-serif; text">2023 / 04</div>
                                                <br />
                                                <div class="stat-desc" style="font-size: 15px;">YYYY/MM </div>
                                            </div>
                                            <div class="stat">

                                                <div class="stat-value text-blue-grey-darken-2"
                                                    style="font-size: 29px; font-family: sans-serif;">96.455 ฿</div>
                                                <br />
                                                <div class="stat-desc">SALARY</div>
                                            </div>
                                            <div class="stat">

                                                <div class="stat-value " style="font-size: 29px; font-family: sans-serif;">

                                                    <v-chip class="ma-2" color="#DF2E38"   text-color="red">
                                                        NOT PAID
                                                    </v-chip>
                                                </div>
                                                <br />
                                                <div class="stat-desc">Status Paid</div>
                                            </div>
                                            <div class="stat">
                                                <v-btn class="mdi mdi-hand-coin " style="background-color: #14C38E; color: white; " > Paid</v-btn>

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
    background-color: #FCF8E8;
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

