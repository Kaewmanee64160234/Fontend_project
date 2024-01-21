<script setup lang="ts">
import { useBillStore } from '@/store/bill.store';
import { onMounted, ref } from 'vue';
import type { VForm } from 'vuetify/components';
import type Employee from '@/store/types/employee.type';
import { useMaterialStore } from '@/store/material.store'
import type { Material } from '@/store/types/material.type';
const billStore = useBillStore()
const form = ref<VForm | null>(null)
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))
const confirmDlg = ref()
const materialStore = useMaterialStore()
const selectedItems = ref<Material[]>([]);
onMounted(async () => {
  await materialStore.getMaterials()
})

async function save() {
  const { valid } = await form.value!.validate()
  if (valid) {
    billStore.bill_list.employeeId = employee.value.id
    billStore.sumBill()
    await confirmDlg.value.openDialog(
      'Please Confirm',
      `Do you want to save this material?`,
      'Accept',
      'Cancel'
    )
    await billStore.saveBill()
    reCode()
    billStore.dialog = false
  }
  
}

const reCode = () => {
  billStore.bill_list.name = ''
  billStore.bill_list.buy = 0
  billStore.bill_list.bill_detail = [
    { id: 0, name: '', amount: 0, price: 0, total: 0, materialId: 0, billId: 0 }
  ]
}

const addItem = (material:Material) => {
  // Implement logic for adding items
  // This is a basic example, you might want to handle quantities and duplicates
  const existingItem = selectedItems.value.find(item => item.id === material.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    selectedItems.value.push({ ...material, quantity: 1 });
  }
};

</script>

<template>
  <div class="container">
    <div class="material-list">
      {{ materialStore.materialList }}
      <!-- List of materials -->
      <ul>
        <li v-for="material in materialStore.materialList" :key="material.id" @click="addItem(material)">
          {{ material.name }}
        </li>
      </ul>
    </div>
    <div class="material-table">
      <!-- Table for added items -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <!-- More columns as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in selectedItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <!-- More columns as needed -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.material-list, .material-table {
  width: 45%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}
.material-list ul {
  list-style-type: none;
  padding: 0;
}
.material-list li {
  padding: 5px;
  margin-bottom: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
}
.material-list li:hover {
  background-color: #e0e0e0;
}
.material-table table {
  width: 100%;
  border-collapse: collapse;
}
.material-table th, .material-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>
