<script setup lang="ts">
import CheckPointDialog from '@/components/CheckPointDialog.vue'
import CheckPromotionDialog from '@/components/promotion/CheckPromotionDialog.vue';
import { useCustomerStore } from '@/store/customer.store'
import { usePointOfSale } from '@/store/pointOfSell.store'
const customerStore = useCustomerStore()
const pointOfSaleStore = usePointOfSale()
</script>

<template>
    <CheckPointDialog></CheckPointDialog>
    <CheckPromotionDialog></CheckPromotionDialog>
    <v-container>
        <v-row justify="center">
            <v-col>
                <v-col>
                    <div class="mockup-phone">
                        <div class="camera"></div>
                        <div class="display">
                            <div class="artboard artboard-demo phone-1">
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <div>
                                                <v-btn block rounded="xl" justify-center class="text-center "
                                                    style="float: right; color: white;" color="#AA8B56" width="80px" height="40px"
                                                    @click="customerStore.dialogCheckPoint = true">Check Point</v-btn>
                                            </div>
                                        </v-col>
                                        
                                    </v-row>
                                    
                                </v-container>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <div>
                                                <v-btn block rounded="xl" justify-center class="text-center"
                                                    style="float: right; color: white ;" color="#AA8B56" width="80px" height="40px" @click="pointOfSaleStore.dialogCheckPromotion = true">Check
                                                    Promotion</v-btn>
            
                                            </div>
                                        </v-col>
                                        
                                    </v-row>
                                    
                                </v-container>
                                

                            </div>
                        </div>
                    </div>

                </v-col>

            </v-col>
        </v-row>
    </v-container>
</template>
