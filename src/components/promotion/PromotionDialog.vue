<script lang="ts" setup>
import { usePointOfSale } from '@/store/pointOfSell.store';

const pointOfSaleStore =  usePointOfSale();

</script>

<template>
  <v-dialog v-model="pointOfSaleStore.dialogPromotion" persistent width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">Promotion</span>
      </v-card-title>

    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-row>
                  <v-col>
                    <v-autocomplete label="Promotions name*" required :rules="[
                      (v) => !!v || 'Promotion is required',
                    ]" :items="['แฮปปี้รับแต้ม', 'แลกคะแนนลดราคา', 'ช้อปครบลดราคา']"></v-autocomplete>
                  </v-col> 
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Code*" :rules="[(v) => !!v || 'Code is required',]"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="pointOfSaleStore.dialogPromotion = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="pointOfSaleStore.dialogPromotion = false"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>