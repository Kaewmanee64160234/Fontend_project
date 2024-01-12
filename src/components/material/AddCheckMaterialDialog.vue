<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import ConfirmDialog from '@/components/ConfirmDialog.vue'
import {
  VForm,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VContainer,
  VRow,
  VCol,
  VTextField,
  VDivider,
  VCardActions,
  VBtn
} from 'vuetify/components'
import { useCheckMaterialStore } from '@/store/checkmaterial.store'
import { useMaterialStore } from '@/store/material.store'

const form = ref<InstanceType<typeof VForm> | null>(null)
const CheckmaterailStore = useCheckMaterialStore()
const materialStore = useMaterialStore()
const confirmDlg = ref()
onMounted(async () => {
  await materialStore.getAllMaterial()
  CheckmaterailStore.checkmeterialDetails = materialStore.materialList.map((material) => ({
    checkmaterialID: 0,
    materialId: material.id!,
    name: '',
    qty_last: material.quantity,

    qty_remain: 0 // default value set to 0
  }))
})

const save = async () => {
  console.log('Save function triggered')
  if (!form.value) {
    console.log('Form is not defined')
    return
  }

  const valid = await form.value.validate()
  console.log('Form validation result:', valid)

  if (valid) {
    await confirmDlg.value.openDialog(
      'Please Confirm',
      'Do you want to save this user?',
      'Accept',
      'Cancel'
    )
    await CheckmaterailStore.saveCheckMat()
  }
}

const closeDialog = () => {
  CheckmaterailStore.dialog = false
}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <VDialog v-model="CheckmaterailStore.dialog" persistent width="1024">
    <VCard>
      <VCardTitle>
        <span class="text-h5">Check Material</span>
      </VCardTitle>
      <VCardText>
        <v-form ref="form">
          <VContainer>
            <v-row v-for="(material, index) in materialStore.materialList" :key="index">
              <v-col cols="12" sm="6" md="4">{{ index + 1 }}. {{ material.name }}</v-col>
              <v-col cols="12" sm="6" md="4">  <v-text-field
                  label="last Quantity*"
                  v-model.number="CheckmaterailStore.checkmeterialDetails[index].qty_last"
                  required
                  :rules="[
                    (v) =>(v >= 0)  || 'Quantity must be 0 or a positive number'
                  ]"
                  disabled
                ></v-text-field></v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Remaining Quantity*"
                  v-model.number="CheckmaterailStore.checkmeterialDetails[index].qty_remain"
                  required
                  :rules="[
                    (v) =>(v >= 0)  || 'Quantity must be 0 or a positive number'
                  ]"
                ></v-text-field>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </VContainer>
        </v-form>
        <small>*indicates required field</small>
      </VCardText>
      <VCardActions>
        <VBtn color="red" variant="text" @click="closeDialog"> Close </VBtn>
        <v-spacer></v-spacer>
        <VBtn color="green" variant="text" @click="save"> Save </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
