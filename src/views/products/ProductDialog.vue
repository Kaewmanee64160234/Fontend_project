<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';

const productStore = useProductStore();
</script>

<template>
   <v-dialog v-model="productStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Product</span>
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
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Type"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Size"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Price*"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-file-input label="File input"></v-file-input>
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
          @click ="productStore.dialog = false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click ="productStore.dialog = false"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>