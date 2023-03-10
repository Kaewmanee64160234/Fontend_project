<script setup lang="ts">
import { ref } from 'vue';
import { useCustomerStore } from '@/store/customer.store';
const dialog = ref(false);
const customerStore = useCustomerStore();

</script>
<template>
    <v-dialog persistent v-model="customerStore.dialog" width="50%">
      <v-card height="500px">
        <v-card-title>
          Find Member

        </v-card-title>
        <v-card-text>

          <v-text-field label="Phone Number" height="20px" hide-details="auto" >
           
          </v-text-field>
           
        
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" variant="text" >Close
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
</template>