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
    <v-dialog v-model="pointOfSaleStore.dialogCheckPromotion" persistent width="30vw" >
        <v-card style="cursor: pointer; border-radius: 50px; padding: 15px;">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon="icon" color="danger" @click="pointOfSaleStore.dialogCheckPromotion = false">X</v-btn>
            </v-card-actions>
            <v-container style="overflow-x: auto; " class="scroll">
                <v-card-text>
                    <v-container style="text-align: center;">
                        <h1 style="font-size: 35px;">Promotion</h1>
                    </v-container>
                    <v-row class="card-promo">
                        <v-col cols="12" >
                            <v-row class="promotion" v-for="item in pointOfSaleStore.promo" :key="item.id">
                                <v-col>
                                    <v-card variant="outlined" class="ma-2 pa-2 card">
                                        <v-row>
                                            <v-col cols="4">
                                                <v-img :src="item.img" style="height: 100px;"></v-img></v-col>
                                            <v-col cols="6" style="text-align: left; margin-top: 20px;margin-left: 40px;">
                                                <span style="font-size: 16px;font-weight: bold;">
                                                    {{ item.name }}
                                                </span> <br>
                                                <span style="font-weight: bold;"> discount: {{ item.price }} บาท</span><br>
                                                <span> point: {{ item.point }} point</span>
                                            </v-col>
                                        </v-row>

                                    </v-card>
                                </v-col>


                            </v-row>




                        </v-col>

                    </v-row>
                </v-card-text>
            </v-container>


        </v-card>


    </v-dialog>
</template>
<style scoped>
.scroll {
    overflow: scroll;
  }
  
  .scroll::-webkit-scrollbar {
    width: 5px;
    height: 4px;
  }
  
  .scroll::-webkit-scrollbar-thumb {
    background-color: #d5d1d1;
    border-radius: 999px;
  }
</style>