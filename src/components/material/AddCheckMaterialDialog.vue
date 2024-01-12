<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useCheckMaterialStore } from '@/store/checkmaterial.store'
import type { VForm } from 'vuetify/components'
import { useMaterialStore } from '@/store/material.store'
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const form = ref<VForm | null>(null)
const url = import.meta.env.VITE_URL_PORT
const CheckmaterailStore = useCheckMaterialStore()
const materialStore = useMaterialStore()
const confirmDlg = ref()

// eslint-disable-next-line no-undef
onMounted(async () => {
  await materialStore.getAllMaterial()
})
async function save() {
  //   const valid =  await form.value!.validate();
  //   if (valid) {
  await confirmDlg.value.openDialog(
    'Please Confirm',
    `Do you want to save this user?`,
    'Accept',
    'Cancel'
  )
  await CheckmaterailStore.saveCheckMat()
  //   }
}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <VDialog v-model="CheckmaterailStore.dialog" persistent width="1024">
    <VCard
      v-for="(checkmat, index) in CheckmaterailStore.checkMaterial.checkMaterialDetails"
      :key="index"
    >
    <!-- {{ materialStore.materialList }} -->
      <VCardTitle>
        <span class="text-h5">Check Material</span>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VContainer>
            <VRow>
              <VCol cols="12" sm="6" md="6">
    
                <VSelect
                  label="Name*"
                  required
                  v-model="checkmat.name"
                  :items="materialStore.materialList"
                  item-text="name"
                  item-value="name"
                  item-title="name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => (v && v.length >= 3) || 'Length must be more than 3'
                  ]"
                ></VSelect>
              </VCol>

              <VCol cols="12" sm="6" md="6">
                <VTextField
                  label="Last Quntity*"
                  required
                  v-model="checkmat.qty_last"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v >= 0 || 'Min_quantity must more than 0'
                  ]"
                >
                </VTextField>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField
                  label="Expire Quantity*"
                  required
                  v-model="checkmat.qty_expire"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v >= 0 || 'Min_quantity must more than 0'
                  ]"
                >
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
        <VBtn color="red" variant="text" @click="CheckmaterailStore.dialog = false"> Close </VBtn>
        <v-spacer></v-spacer>
        <VBtn color="green" variant="text" @click="save()"> Save </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
