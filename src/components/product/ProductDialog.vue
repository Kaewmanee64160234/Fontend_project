<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { ref } from 'vue';
import type { VForm } from 'vuetify/components'
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const form = ref<VForm | null>(null)
const url = import.meta.env.VITE_URL_PORT
const confirmDlg = ref();
const productStore = useProductStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await confirmDlg.value.openDialog("Pleases Confirm", `Do you want to save this product ?`, 'Accept', 'Cancel');
    await productStore.saveProduct();
  }
}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-dialog v-model="productStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Product</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row justify="center">
              <v-avatar size="80"><v-img
                  :src="`${url}/products/image/${productStore.editedProduct.image}`"></v-img></v-avatar>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required v-model="productStore.editedProduct.name" :rules="[
                  (v) => !!v || 'Name is required',
                  (v) => v.length >= 3 || 'Length must more than 3',
                ]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete v-model="productStore.editedProduct.catagory" label="Catagory*" required :rules="[(v) => !!v || 'Type is required',]"
                  :items="['Foods', 'Drinks', 'Desserts']"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4" v-if="productStore.editedProduct.catagory === ''">
                <v-autocomplete label="Type*"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4" v-if="productStore.editedProduct.catagory === 'Foods'">
                <v-autocomplete label="Type*" required v-model="productStore.editedProduct.type" :rules="[
                  (v) => !!v || 'Type is required',
                ]" :items="productStore.typeProduct.food"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4" v-if="productStore.editedProduct.catagory === 'Drinks'">
                <v-autocomplete label="Type*" required v-model="productStore.editedProduct.type" :rules="[
                  (v) => !!v || 'Type is required',
                ]" :items="productStore.typeProduct.drink"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4" v-if="productStore.editedProduct.catagory === 'Desserts'">
                <v-autocomplete label="Type*" required v-model="productStore.editedProduct.type" :rules="[
                  (v) => !!v || 'Type is required',
                ]" :items="productStore.typeProduct.dessert"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Size" required v-model="productStore.editedProduct.size" :rules="[
                  (v) => !!v || 'Size is required',
                ]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Price*" v-model.number="productStore.editedProduct.price" :rules="[(v) => !!v || 'Price is required',
                (v) => v >= 0 || 'Price must more than 0',]"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input color="deep-purple-accent-4" counter multiple placeholder="Select your files"
                  prepend-icon="mdi-paperclip" variant="outlined" :show-size="1000" label="Image Input" accept="image/*"
                  v-model="productStore.editedProduct.files">
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="productStore.dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>