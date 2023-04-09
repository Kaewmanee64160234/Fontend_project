<script lang="ts" setup>
import { ref } from 'vue';
// import type { VForm } from 'vuetify/components';
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useCheckMaterialStore } from '@/store/checkmaterial.store';
import type { VForm } from 'vuetify/components';
const form = ref<VForm | null>(null);
const url = import.meta.env.VITE_URL_PORT
const CheckmaterailStore = useCheckMaterialStore();
const confirmDlg = ref();

async function save() {

//   const valid =  await form.value!.validate();
//   if (valid) {
    await confirmDlg.value.openDialog("Please Confirm", `Do you want to save this user?`, 'Accept', 'Cancel');
    await CheckmaterailStore.saveCheckMat()
//   }

}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <VDialog v-model="CheckmaterailStore.dialog" persistent width="1024">
    <VCard v-for="(item, index) in CheckmaterailStore.checkMaterial.checkMaterialDetails" :key="index">
      <VCardTitle>
        <span class="text-h5">Check Material</span>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VContainer>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Name*" required v-model="item.name"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]">
                </VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Last Quntity*" required v-model="item.qty_last"
                :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']">
                </VTextField>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Expire Quantity*" required v-model="item.qty_expire"
                :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']">
                </VTextField>
              </VCol>
              <!-- <VCol cols="12" sm="6" md="6">
                <VTextField label="Remain Quntity*" required v-model="item.qty_remain"
                :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']">
                </VTextField>
              </VCol> -->
            </VRow>
            </VContainer>
        </VForm>
        <small>*indicates required field</small>
      </VCardText>
      <VCardActions>
       
      <VBtn color="red" variant="text" @click="CheckmaterailStore.dialog = false">
        Close
      </VBtn>
      <v-spacer></v-spacer>
      <VBtn color="green" variant="text" @click="save()"> Save </VBtn>
    </VCardActions>
  </VCard>
</VDialog></template>