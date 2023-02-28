<script setup lang="ts">
import { ref } from 'vue';
const search = ref("");
const headers = ref("");
const desserts = ref("");
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
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
</v-card>
</template>
