<script setup lang="ts">
import router from '@/router'
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
onMounted(() => {
    if(employee.value.position === 'employee'){
        router.push('/employee/login')
    }
});
const goTo = (index: string) => {
    router.push('/manager/login/' + index);
}

onMounted(async () => {
    await employeeStore.getEmployees()

});


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
                            <th>Hour</th>
                            <th>Salary</th>
                            <th>Operations</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center mr-5 " style="justify-content: center"
                            v-for="(item, index) in employeeStore.employees" :key="index">
                     
                            <td>{{ index+1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.fullTime }}</td>
                            <td>{{ item.position }}</td>

                            <td>
                                <v-btn class="mdi mr-2  mdi-eye" style=" color: white" color="blue-lighten-1"
                                    @click="goTo(item.id + '')"> History </v-btn>

                            </td>

                        </tr>


                    </tbody>

                </v-table>
            </v-card-title>
        </v-card>
    </v-container>
</template>
