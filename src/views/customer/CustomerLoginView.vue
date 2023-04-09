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
                                <div>
                                    <v-btn justify-center class="mdi mr-2 mdi-checkbox-marked-circle ma-6 text-center "
                                        style="float: right; color: white;" color="#D5B4B4" width="90%"
                                        @click="customerStore.dialogCheckPoint = true">Check Point</v-btn>
                                </div>
                                <div>
                                    <v-btn justify-center class="mdi mr-2 mdi-checkbox-marked-circle text-center"
                                        style="float: right; color: white ;" color="#D5B4B4" width="90%" @click="pointOfSaleStore.dialogCheckPromotion = true">Check
                                        Promotion</v-btn>
                                </div>

                            </div>
                        </div>
                    </div>

                </v-col>

            </v-col>
        </v-row>
    </v-container>
</template>
