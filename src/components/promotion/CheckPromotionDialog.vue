<script setup lang="ts">
import { usePointOfSale } from '@/store/pointOfSell.store'
import { ref } from 'vue'
const dialog = ref()
const pointOfSaleStore = usePointOfSale()
let namePromotion = ref("");
const showName = (namePromo: string) => {
  namePromotion.value = namePromo;
}
</script>
<template>
    <v-dialog v-model="pointOfSaleStore.dialogCheckPromotion" persistent width="1000">
        <v-card>
            <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="4"  v-for="item in pointOfSaleStore.promo" :key="item.id">
                      <v-card variant="outlined" class="ma-2 pa-2 card" @click="pointOfSaleStore.selectCode(item.id),showName(item.name)" >
                        <v-img :src="item.img" style="height: 100px;"></v-img>
                        <v-card-title class="mt-5" style="font-size: 20px; text-align: center;">
                          {{ item.name }}
                        </v-card-title>
                        
                      </v-card>
                      
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn color="primary" block @click="pointOfSaleStore.dialogCheckPromotion = false">Close Dialog</v-btn>
              </v-card-text>
            
        </v-card>
        
        
    </v-dialog>
</template>