<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { onMounted, ref } from 'vue';
import type { VForm } from 'vuetify/components'
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useCatagoryStore } from '@/store/catagory';

const form = ref<VForm | null>(null)
const url = import.meta.env.VITE_URL_PORT
const confirmDlg = ref();
const productStore = useProductStore();
const catagoryStore = useCatagoryStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await confirmDlg.value.openDialog("Pleases Confirm", `Do you want to save this product ?`, 'Accept', 'Cancel');
    await productStore.saveProduct();
  }
}

onMounted( async () => {
  await catagoryStore.getCatagories();
});
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
              <v-select label="Category*" v-model="productStore.editedProduct.catagoryId" :items="catagoryStore.catagories" item-title="name"
                item-value="id" single-line></v-select>
            </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="productStore.editedProduct.catagoryId === 1">
                    <v-autocomplete label="Type*" required v-model="productStore.editedProduct.type" :rules="[
                      (v) => !!v || 'Type is required',
                    ]" :items="productStore.typeProduct.Foods"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="productStore.editedProduct.catagoryId === 2">
                    <v-autocomplete label="Type*" required v-model="productStore.editedProduct.type" :rules="[
                      (v) => !!v || 'Type is required',
                    ]" :items="productStore.typeProduct.Drinks"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="productStore.editedProduct.catagoryId === 3">
                    <v-autocomplete label="Type*" required v-model="productStore.editedProduct.type" :rules="[
                      (v) => !!v || 'Type is required',
                    ]" :items="productStore.typeProduct.Desserts"></v-autocomplete>
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
          <!-- <div>{{ productStore.editedProduct }}</div> -->
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