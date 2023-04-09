<script lang="ts" setup>
import { useMaterialStore } from '@/store/material.store';
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const form = ref<VForm | null>(null)
const materialStore = useMaterialStore();
const confirmDlg = ref();

async function save() {
  const { valid } = await form.value!.validate()
  if (valid) {
  await confirmDlg.value.openDialog("Please Confirm", `Do you want to save this material?`,'Accept','Cancel');
  await materialStore.saveMaterial();
  materialStore.dialog = false;
  }
}
</script>
<template>
   <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
     <v-dialog persistent width="1024" v-model="materialStore.dialog">
    <v-card>
      <v-card-title>
        <span class="text-h5">Material</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Name*"
                  required
                  v-model="materialStore.editedMaterial.name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="md-4">
                <v-text-field
                  label="Min_quantity*"
                  required
                  v-model.number="materialStore.editedMaterial.min_quantity"
                  :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']"
                ></v-text-field>
              </v-col>
              <v-col cols="md-4">
                <v-text-field
                  label="Quantity*"
                  required
                  v-model.number="materialStore.editedMaterial.quantity"
                  :rules="[(v) => !!v || 'Item is required',
                (v) => v > 0 || 'Quantity must more than 0']"
                ></v-text-field>
              </v-col>
              <v-col cols="md-4">
              <v-select
                  label="Unit*"
                v-model.number="materialStore.editedMaterial.unit"
                :items="['Bag','Box','Gallon','Kilogram','Liter','Pack']"
              >
              </v-select>
              </v-col>
              <v-col cols="md-4">
                <v-text-field
                  label="Price_per_unit*"
                  required
                  v-model.number="materialStore.editedMaterial.price_per_unit"
                  :rules="[(v) => !!v || 'Item is required',
                    (v) => v > 0 || 'Price_per_unit must more than 0']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="red"
          variant="text"
          @click="materialStore.dialog=false"
        >
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green" variant="text" @click ="save" > Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
