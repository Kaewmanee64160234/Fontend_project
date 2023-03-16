
<script lang="ts" setup>
import BoarddayDialog from "../../components/dashboards/BoardmonthDialog.vue"
import BoardmonthDialog from "../../components/dashboards/BoardmonthDialog.vue"
import BoardyearDialog from "../../components/dashboards/BoardyearDialog.vue"
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        Dashbords
        </v-card-title>
        <BoarddayDialog></BoarddayDialog>
        <BoardmonthDialog></BoardmonthDialog>
        <BoardyearDialog></BoardyearDialog>
        </v-card>
        </v-container>
</template>