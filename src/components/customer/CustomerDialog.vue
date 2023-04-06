<script lang="ts" setup>
import { useCustomerStore } from '@/store/customer.store'
import { ref } from 'vue'
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import type { VForm } from 'vuetify/components'
const form = ref<VForm | null>(null)
const confirmDlg = ref();
const customerStore = useCustomerStore()

async function save() {
    const { valid } = await form.value!.validate()
    if (valid) {
        await confirmDlg.value.openDialog("ยืนยันการแก้ไข", `คุณต้องการแก้ไขข้อมูลพนักงานคนนี้ใช่หรือไม่?`, 'Accept', 'Cancel');
        await customerStore.saveCustomer()
    }
}
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <v-row justify="center">
      <v-dialog
        v-model="customerStore.addCustomerDialog"
        persistent
        width="1024"
      >
        
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Customer</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="First name*"
                    required
                    :rules="[(v) => !!v || 'First name is required']">
                  </v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Last name*"
                    required
                    :rules="[(v) => !!v || 'Last name is required']"
                  ></v-text-field>
                </v-col>

                
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Tel."
                    required
                    :rules="[(v) => !!v || 'tel is required']"
                    
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    :items="['Male', 'Female']"
                    label="Gender"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="customerStore.addCustomerDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="customerStore.addCustomerDialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>