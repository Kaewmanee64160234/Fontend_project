<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMaterialStore } from '@/store/material.store.js';
import MaterialsDialog from '@/components/material/MaterialsDialog.vue';
const search = ref("");
const materialStore = useMaterialStore();
const confirmDlg = ref();

onMounted(async() => {
    await materialStore.getMaterials();
});
const deleteMaterial = async (id:number) => {
  await confirmDlg.value.openDialog("ยืนยันการลบ", `คุณต้องการลบลูกค้าคนนี้ใช่หรือไม่?`,'Accept','Cancel');
  materialStore.deleteMaterial(id);
}
</script>
<template>
    <v-card>
     <v-card-title>
      Material
      <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
      <MaterialsDialog></MaterialsDialog>
      <v-btn style="float: right;background-color: #8ad879; color: white" @click="materialStore.dialog = true">Add New</v-btn>
      <v-container></v-container>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Min_quantity</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price_per_unit</th>
                <th>Operations</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item of materialStore.materials" :key="item.id" style="text-align: center;">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td v-if="item.minquantity <= 5" style="color: red;">{{ item.minquantity }}</td>
                <td v-if="item.minquantity > 5">{{ item.minquantity }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price_per_unit }}</td>
                <td><v-btn class="mr-5" color="secondary" @click="materialStore.editMaterial(item)">Edit</v-btn>
                <v-btn color="error" @click="deleteMaterial(item.id!)">Delete</v-btn></td>
            </tr>
        </tbody>
    </v-table>
</v-card>
</template>
