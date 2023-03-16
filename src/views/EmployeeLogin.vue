<script setup lang="ts">
import { useEmployeeStore } from '@/store/employee.store'
import type Employee from '@/store/types/employee.type';
import type User from '@/store/types/user.type';
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
const employeeStore = useEmployeeStore()
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const email = ref('')
const name = ref('')
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value));
</script>

<template>
    <v-container>
        <v-card style="background-color: #F1DEC9;">
            <v-card-title>
                Employee 
                <v-spacer> </v-spacer>

                <v-table class="text-center mt-5" style="background-color: #F1DEC9;">
                    <v-row>
                        <v-col colspan="2">
                            <v-avatar size="80" color="black"></v-avatar>
                            <div class="d-flex align-center flex-column">
                                <div class="text-subtitle-2 mt-3"> {{ employee.name }}</div>
                                <v-card class="mt-5" width="350" text="This is content"></v-card>
                            </div>

                        </v-col>
                    </v-row>

                </v-table>

                <v-table height="400px">
                    <thead style="background-color: #F1DEC9;">
                        <tr>
                            <td></td>
                            
                            <td> 
                                <v-btn class="mdi mr-2  mdi-delete" style="float: right; color: white" color="red">Checkout</v-btn>
                                <v-btn class="mdi mr-2  mdi-delete" style="float: right; color: white" color="blue">Checkin</v-btn>
                            </td>



                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th class="text-center ml-5">
                                Timein
                            </th>
                            <th class="text-center mr-5">
                                Timeout
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ name }}</td>

                        </tr>
                    </tbody>
                </v-table>


            </v-card-title>

        </v-card>
    </v-container>
</template>


