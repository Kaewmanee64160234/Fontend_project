
<script setup lang="ts">
import ConfirmDialog from '@/components/ConfirmDialog.vue';
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
const loading = ref(false);
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))

onMounted(async () => {
    await employeeStore.getOneEmployee(employee.value.id + '')
    console.log(employeeStore.editEmployee)
});
</script>

<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
        <v-container>
            <v-card style="background-color: #E9EDC9">
                <v-card-title>
                    Employee
                    <v-spacer> </v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-table class="text-center mt-5" style="background-color: #E9EDC9">
                        <v-row>
                            <v-col>
                                <v-row>
                                    <v-col style="justify-content: center">
                                        <v-avatar size="100"><v-img
                                                :src="`${url}/employees/image/${employee.image}`"></v-img></v-avatar>
                                        <div class="text-subtitle-2 mt-3">{{ employee.name }}</div>

                                    </v-col>

                                </v-row>


                                <v-row style="justify-content: center ">
                                    <div>
                                        <v-card style="justify-content: center" width="400" text="Pofile">
                                            <v-card-title style="justify-content: center">
                                                <div class="text-center" style="font-size: 75%;">
                                                    <p>Name : {{ employee.name }}</p>
                                                    <p>Email : {{ employee.email }}</p>
                                                    <p>Position : {{ employee.position }}</p>
                                                </div>
                                            </v-card-title>
                                        </v-card>
                                    </div>
                                </v-row>
                                <v-row>
                                    <v-col class="switch">
                                        <v-btn class="mdi mr-2 mdi-close-circle" style="float: right; color: white"
                                            color="red" @click="employeeStore.empCheckOut" > Checkout</v-btn>

                                        <v-btn class="mdi mr-2 mdi-checkbox-marked-circle" style="float: right; color: white"
                                            color="green" @click="employeeStore.empCheckIn">Checkin</v-btn>

                                    </v-col>
                                </v-row>

                            </v-col>
                        </v-row>

                        <VTable class="text-center mt-5" style="justify-content: center; overflow-y: auto;">

                            <thead style="justify-content: center; overflow-y: auto;">

                                <tr>
                                    <th>Time in</th>
                                    <th>Time out</th>
                                    <th>Total hour</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center mr-5 " style="justify-content: center"
                                    v-for="(item, index) in employeeStore.editEmployee.check_in_outs" :key="index">
                                    <td>{{ item.time_in }}</td>
                                    <td>{{ item.time_out }}</td>
                                    <td>{{ item.total_hour }}</td>
                                </tr>
                            </tbody>

                        </VTable>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-container>
</template>
<style></style>

