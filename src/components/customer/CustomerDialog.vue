<script lang="ts" setup>
import { useCustomerStore } from "@/store/customer.store";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
const form = ref<VForm | null>(null);
const customerStore = useCustomerStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await customerStore.saveCustomer();
  }
}
</script>
<template>
  <v-dialog v-model="customerStore.dialog" persistent width="1024">
    <v-card>
    <v-container>
        <v-card-title>
        <span class="text-h5">User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="name*"
                  required
                  v-model="customerStore.editCustomer.name"
                  :rules="[
                    (v) => !!v || 'name is required',
                  
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="tel*"
                  required
                  v-model="customerStore.editCustomer.tel"
                  :rules="[
                    (v) => !!v || 'Item is required',
                  
                  ]"
                ></v-text-field>
              </v-col>
             
              <v-col cols="12">
                
                <v-text-field
                  label="Point*"
                  required
                  v-model="customerStore.editCustomer.point"
                  :rules="[
                    (v) => !!v || 'Item is required',
                  
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                
                <v-file-input label="File input"  accept="image/png, image/jpeg, image/bmp"  prepend-icon="mdi-camera" v-model="customerStore.editCustomer.files"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="customerStore.dialog = false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-container>

      
    </v-card>
  </v-dialog>
</template>
