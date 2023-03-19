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
const route = useRoute()
const id = ref(route.params.id)

onMounted(async () => {
await employeeStore.getOneEmployee(employee.value.id + '')
console.log(employeeStore.editEmployee)
})
</script>

<template>
<ConfirmDialog ref="confirmDlg"></ConfirmDialog>
<v-container>
<v-card>
<v-card-text width="100vw" style="height: 90vh">
<v-row class="text-center" cols="12">
<v-col class="title" md="4">
<v-container style="height: 100%">
<v-row class="profile" style="height: 30%">
<v-col>
<v-container>
<v-avatar size="100"
><v-img :src="`${url}/employees/image/${employee.image}`"></v-img
></v-avatar>
<div class="text-subtitle-2 mt-3">{{ employee.name }}</div></v-container
>
</v-col>
</v-row>
<hr style="border: 2px solid #e4dccf; border-radius: 50px" />
<v-row style="height: 50%">
<v-col class="detail-emp">
<div style="text-align: left">
<p>📛 Name : {{ employee.name }}</p>
<p>📨 Email : {{ employee.email }}</p>
<p>🗃️ Position : {{ employee.position }}</p>
</div>
</v-col>
</v-row>
<v-row class="button" style="height: 10%">
<v-col>
<v-btn
class="mdi mr-2 mdi-close-circle"
style="float: right; color: white"
color="red"
@click="employeeStore.empCheckOut"
>
Checkin</v-btn
>

<v-btn
class="mdi mr-2 mdi-checkbox-marked-circle"
style="float: right; color: white"
color="green"
@click="employeeStore.empCheckIn"
>Checkin</v-btn
>
</v-col>
</v-row>
</v-container>
</v-col>

<v-col class="detail">
<v-container>
<VTable class="text-center mt-5" style="justify-content: center; overflow-y: auto">
<thead style="justify-content: center; overflow-y: auto">
<tr>
<th>Time in</th>
<th>Time out</th>
<th>Total hour</th>
</tr>
</thead>
<tbody>
<tr
class="text-center mr-5"
style="justify-content: center"
v-for="(item, index) in employeeStore.editEmployee.check_in_outs"
:key="index"
>
<td>{{ item.time_in }}</td>
<td>{{ item.time_out }}</td>
<td>{{ item.total_hour }}</td>
</tr>
</tbody>
</VTable>
</v-container>
</v-col>
</v-row>
</v-card-text>
</v-card>
</v-container>
</template>
<style scoped>
.title {
background-color: rgb(250, 235, 215, 0.5);
height: 100vh;
}
.detail-emp {
width: 100%;
display: flex;
justify-content: center;
}
.detail {
width: 70vw;
}
</style>
