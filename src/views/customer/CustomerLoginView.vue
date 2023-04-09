<script setup lang="ts">
import CheckPointDialog from '@/components/CheckPointDialog.vue'
import CheckPromotionDialog from '@/components/promotion/CheckPromotionDialog.vue';
import { useCustomerStore } from '@/store/customer.store'
import { usePointOfSale } from '@/store/pointOfSell.store'
const customerStore = useCustomerStore()
const pointOfSaleStore = usePointOfSale()
</script>

<template>
    <v-img src="https://i.pinimg.com/564x/dc/fe/3d/dcfe3d03c2ae0fa4d19a97497f267ccf.jpg" style="scope">
        <v-container>
            <CheckPointDialog></CheckPointDialog>
            <CheckPromotionDialog></CheckPromotionDialog>
            <v-row justify="center" class="pa-2 mb-6">
                <v-col>
                    <v-col>
                        <div class="mockup-phone">
                            <div class="camera"></div>
                            <div class="display">
                                <div class="artboard artboard-demo phone-1">
                                <v-img src="https://i.pinimg.com/564x/bb/b9/52/bbb952ea3876d139a2c0234da2e251e8.jpg" cover height="588px" width="320px">
                                    <v-container style="margin-top: 50%;">
                                        <v-container>
                                            <v-row>
                                                <v-col>
                                                    <div>
                                                        <v-btn block rounded="xl" justify-center class="text-center "
                                                            style="float: right; color: white;" color="#AA8B56" width="80px"
                                                            height="40px"
                                                            @click="customerStore.dialogCheckPoint = true">Check
                                                            Point</v-btn>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <v-container>
                                            <v-row>
                                                <v-col>
                                                    <div>
                                                        <v-btn block rounded="xl" justify-center class="text-center"
                                                            style="float: right; color: white ;" color="#AA8B56"
                                                            width="80px" height="40px"
                                                            @click="pointOfSaleStore.dialogCheckPromotion = true">Check
                                                            Promotion</v-btn>

                                                    </div>
                                                </v-col>

                                            </v-row>

                                        </v-container>
                                    </v-container>
                                        
                                    
                                </v-img>
                            </div>
                            </div>
                        </div>
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
    </v-img>
</template>
