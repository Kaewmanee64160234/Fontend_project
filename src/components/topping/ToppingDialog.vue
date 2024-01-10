<script lang="ts" setup>
import { useToppingStore } from '@/store/topping.store';
import { useCatagoryStore } from '@/store/catagory';
import { onMounted, ref, computed } from 'vue';
import type { VForm } from 'vuetify/components';
import ConfirmDialog from "@/components/ConfirmDialog.vue";



const form = ref<VForm | null>(null)
const url = import.meta.env.VITE_URL_PORT
const confirmDlg = ref()
const toppingStore = useToppingStore()
const catagoryStore = useCatagoryStore()
async function save() {
  const { valid } = await form.value!.validate()
  if (valid) {
    await confirmDlg.value.openDialog(
      'Pleases Confirm',
      `Do you want to save this topping ?`,
      'Accept',
      'Cancel'
    )
    await toppingStore.saveTopping()
  }
}

onMounted(async () => {
  await catagoryStore.getCatagories()
})
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-dialog v-model="toppingStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Product</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
           
            <v-row>
                <v-text-field
                  label="Name*"
                  required
                  v-model="toppingStore.editedTopping.name"
                  :rules="[
                    (v) => !!v || 'Name is required',
                    (v) => v.length >= 3 || 'Length must more than 3'
                  ]"
                ></v-text-field>
             
             
            </v-row>
            <v-row>
              <v-select
                  label="Category*"
                  v-model="toppingStore.editedTopping.category"
                  :items="catagoryStore.catagories"
                  item-title="name"
                  item-value="id"
                  single-line
                ></v-select>
            </v-row>
            <v-row>
           
              <!-- <v-col cols="12" sm="6" md="6"> -->
                <v-text-field
                  label="Price*"
                  v-model.number="toppingStore.editedTopping.price"
                  :rules="[
                    (v) => !!v || 'Price is required',
                    (v) => v >= 0 || 'Price must more than 0'
                  ]"
                ></v-text-field>
              <!-- </v-col> -->
            </v-row>
          
          </v-container>
          <!-- <div>{{ toppingStore.editedTopping }}</div> -->
        </v-form>
     
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="text" @click="toppingStore.dialog = false"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green" variant="text" @click="save()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
