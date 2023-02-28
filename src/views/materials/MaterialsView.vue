<script setup lang="ts">
import { ref } from 'vue';
import { useMaterialStore } from '@/store/material.store.js';
const search = ref("");
const headers = ref("");
const desserts = ref("");
const materialStore = useMaterialStore();

</script>
<template>
    <v-card>
     <v-card-title>
      Material
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
            <tr v-for="item of materialStore.materials" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.minquantity }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price_per_unit }}</td>
                <td><v-btn>Edit</v-btn>
                <v-btn>Delete</v-btn></td>
            </tr>
        </tbody>
    </v-table>
</v-card>
</template>
