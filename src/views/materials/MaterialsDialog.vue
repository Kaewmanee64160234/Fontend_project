<script lang="ts" setup>
import { useMaterialStore } from '@/store/material.store';
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const form = ref<VForm | null>(null);
const materialStore = useMaterialStore();
const confirmDlg = ref();
async function save() {
    const { valid } = await form.value!.validate();
    if (valid) {
        await confirmDlg.value.openDialog("ยืนยันการแก้ไข", `คุณต้องการแก้ไขข้อมูลลูกค้าคนนี้ใช่หรือไม่?`,'Accept','Cancel');
        await materialStore.saveMaterial();
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
              <v-col cols="12">
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
              <v-col cols="12">
                <v-text-field
                  label="Min_quantity*"
                  required
                  v-model="materialStore.editedMaterial.minquantity"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Quantity*"
                  required
                  v-model="materialStore.editedMaterial.quantity"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Unit*"
                  required
                  v-model="materialStore.editedMaterial.unit"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price_per_unit*"
                  required
                  v-model="materialStore.editedMaterial.price_per_unit"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
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
          @click="materialStore.dialog=false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save" > Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
