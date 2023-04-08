<script lang="ts" setup>
import { useCustomerStore } from '@/store/customer.store'
import { ref } from 'vue'
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import type { VForm } from 'vuetify/components'
const form = ref<VForm | null>(null)
const confirmDlg = ref();
const url = import.meta.env.VITE_URL_PORT;
const customerStore = useCustomerStore()

async function save() {
    const { valid } = await form.value!.validate()
    if (valid) {
        await confirmDlg.value.openDialog("Please Confirm", `Do you want to save this customer?`, 'Accept', 'Cancel');
        await customerStore.saveCustomer()
    }
}
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <v-row justify="center">
      <v-dialog
        v-model="customerStore.dialog"
        persistent
        width="1024"
      >
        
      <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h5">Customer</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row justify="center">
                <v-avatar size="80"
                  ><v-img
                    :src="`${url}/customers/image/${customerStore.editCustomer.image}`"
                  ></v-img
                ></v-avatar>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="name*"
                    required
                    v-model="customerStore.editCustomer.name"
                    :rules="[(v) => !!v || 'name is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="tel*"
                    required
                    v-model="customerStore.editCustomer.tel"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Point*"
                    required
                    v-model="customerStore.editCustomer.point"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    color="deep-purple-accent-4"
                    counter
                    multiple
                    placeholder="Select your files"
                    prepend-icon="mdi-paperclip"
                    variant="outlined"
                    :show-size="1000"
                    label="File input"
                    accept="image/png, image/jpeg, image/bmp"
                    v-model="customerStore.editCustomer.files"
                    
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" variant="text" @click="customerStore.dialog = false">
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" variant="text" @click="save"> Save </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
      </v-dialog>
    </v-row>
  </template>