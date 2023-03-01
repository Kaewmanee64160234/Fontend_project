<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMaterialStore } from '@/store/material.store.js';
import MaterialsDialog from '@/components/material/MaterialsDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
const materialStore = useMaterialStore();
const confirmDlg = ref();

const material = computed(() => {
  if (!materialStore.search) {
    return materialStore.materials;
  } else {
    return materialStore.materials.filter((material) => {
      return material.name.toLocaleLowerCase().includes( materialStore.search
      )
    });
  }
});


onMounted(async() => {
    await materialStore.getMaterials();
});
const deleteMaterial = async (id: string) => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบสินค้านี้ใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  materialStore.deleteMaterial(id)
}
const deleteAllMaterials = async () => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบข้อมูลสินค้าทั้งหมดใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  await materialStore.deleteMaterials()
}
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <MaterialsDialog></MaterialsDialog>
    <v-container>
    <v-card>
     <v-card-title>
      Material
      <v-btn class="mdi mdi-plus" style="float: right; background-color: #8ad879; color: white"
          @click="materialStore.dialog = true">Add New Material</v-btn>
          <v-btn class="mdi mdi-delete mr-2" style="float: right; color: white" color="red" @Click="deleteAllMaterials">Delete All</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
      style="width: 20%"
          variant="solo"
          color="deep-purple-accent-4"
          class="mt-7"
          density="compact"
          append-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          v-model="materialStore.search"></v-text-field>
    </v-card-title>
    <v-table>
        <thead>
            <tr>
                <th>
              <v-checkbox
                  class="d-flex pa-4"
                  style="justify-content: center"
                  color="indigo"
                  v-model="materialStore.allSelected"
                  @click="materialStore.selectMaterialAll"
                ></v-checkbox>
            </th>
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
            <tr v-for="item of material" :key="item.id" style="text-align:center">
                <v-checkbox
                style="justify-content: center;"
                  class="d-flex pa-4"
                  color="indigo"
                  v-model="materialStore.selected"
                  @click="materialStore.selectMaterial"
                  :value="item.id+''"
                ></v-checkbox>
                <td>{{ item.id }}</td>
                <td v-if="item.minquantity <= 5" style="color: red;">{{ item.name }}</td>
                <td v-if="item.minquantity > 5">{{ item.name }}</td>
                <td>{{ item.minquantity }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price_per_unit }}</td>
                <td><v-btn color="yellow" class="mr-5"  @click="materialStore.editMaterial(item)">Edit</v-btn>
                <v-btn color="#F55050" @click="deleteMaterial(item.id + '')">Delete</v-btn></td>
            </tr>
        </tbody>
        <tbody v-if="material.length == 0" >
          <tr >
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
    </v-table>
</v-card>
</v-container>
</template>
