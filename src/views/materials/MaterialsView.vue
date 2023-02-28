<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMaterialStore } from '@/store/material.store.js';
import MaterialsDialog from './MaterialsDialog.vue';
const search = ref("");
const materialStore = useMaterialStore();

onMounted(async() => {
    await materialStore.getMaterials();
});

</script>
<template>
    <v-card>
     <v-card-title>
      Material
      <MaterialsDialog></MaterialsDialog>
      <v-btn style="float: right;" color="primary" @click="materialStore.dialog=true">Add New</v-btn>
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
                <td>{{ item.minquantity }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price_per_unit }}</td>
                <td><v-btn class="mr-5" color="secondary" @click="materialStore.editMaterial(item)">Edit</v-btn>
                <v-btn color="error" @click="materialStore.deleteMaterial(item.id!)">Delete</v-btn></td>
            </tr>
        </tbody>
    </v-table>
</v-card>
</template>
