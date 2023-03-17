<script setup lang="ts">
import { useMaterialStore } from '@/store/material.store';

const materiaStore = useMaterialStore();
const billDettailList = ref<([])

</script>
<template>
  <v-dialog class="dialog"
      v-model="materiaStore.BillDialog"
      width="auto"
    >
      <v-card>
        <v-card-text>
          <v-text-field
        v-model="firstName"
        :rules="rules"
        label="First name"
      ></v-text-field> 
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="materiaStore.BillDialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style scoped> 
.dialog{
    width: 50vw;
    
}
</style>