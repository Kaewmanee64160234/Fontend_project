<script lang="ts" setup>
import { usePointOfSale } from '@/store/pointOfSell.store';
import { ref } from 'vue';

const pointOfSaleStore =  usePointOfSale();
let namePromotion = ref("");

const showName = (namePromo: string) => {
  namePromotion.value = namePromo;
}
</script>

<template>
  <v-dialog v-model="pointOfSaleStore.dialogPromotion" persistent width="700">
    <v-card>
      <v-card-title >
        <span class="text-h5">Promotion</span>
      </v-card-title>
      <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" v-for="item in pointOfSaleStore.promo" :key="item.id">
                <v-card variant="outlined" class="ma-2 pa-2 card" @click="pointOfSaleStore.checkCode(item.id),showName(item.name)">
                  <v-img :src="item.img" class="img-promo"></v-img>
                  <v-card-title class="mt-5" style="font-size: 20px; text-align: center;">
                    {{ item.name }}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-title>
          <span class="text-h5">{{ namePromotion }}</span>
        </v-card-title>
        <v-container>
            <v-row >
             <v-col cols="12">
              <v-text-field
            label="กรุณากรอก Code ⭐">
          </v-text-field></v-col>
            </v-row>
          </v-container>
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
