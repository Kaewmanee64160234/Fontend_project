<script lang="ts" setup>
import { useStoreStore } from '@/store/store.store';
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
const form = ref<VForm | null>(null);
const storeStore = useStoreStore();
const confirmDlg = ref();

async function save(){
  const {valid} = await form.value!.validate();
  if(valid){
    await confirmDlg.value.openDialog("Please Confirm", `Do you want to save this store?`,'Accept','Cancel');
    await storeStore.saveStore()
  }

}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-dialog v-model="storeStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Store</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="StoreName*" required v-model="storeStore.editedStore.name"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Address*" required v-model="storeStore.editedStore.address"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 30 || 'Length must more than 30',]"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field label="tel*" required v-model="storeStore.editedStore.tel"
                  :rules="[(v) => !!v || 'tel is required']"></v-text-field>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="text" @click="storeStore.dialog = false">
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>