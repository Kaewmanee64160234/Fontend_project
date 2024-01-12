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
        await confirmDlg.value.openDialog("Please Confirm", `Do you want to add this customer?`, 'Accept', 'Cancel');
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
        width="800"
      >
        
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Customer</span>
          </v-card-title>
          <v-card-text>
          <v-form ref="form">
            <v-container>
              
              <v-row>
                <v-col cols="md-4">
                  <v-text-field
                    label="name*"
                    required
                    v-model="customerStore.editCustomer.name"
                    :rules="[(v) => !!v || 'name is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="md-4">
                  <v-text-field
                    label="tel*"
                    required
                    v-model="customerStore.editCustomer.tel"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>

                <v-col cols="md-4">
                  <v-text-field
                    label="Point*"
                    required
                    v-model="customerStore.editCustomer.point"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
               
              </v-row>
            </v-container>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" variant="text" @click="customerStore.dialog = false,customerStore.addCustomerDialog = false">
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" variant="text" @click="save"> Save </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>