<script setup lang="ts">
import { usePointOfSale } from '@/store/pointOfSell.store'
const pointOfSaleStore = usePointOfSale()
const close2Dialog = () => {
    pointOfSaleStore.dialogCash = false;
    pointOfSaleStore.order.payment = 'cash'
}
</script>
<template>
    <v-dialog v-model="pointOfSaleStore.dialogCash" persistent width="1000">
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 scroll">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://inwfile.com/s-cp/73riz8.jpg" cover alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://inwfile.com/s-cp/lab383.jpg" 
                                cover alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://my.kapook.com/imagescontent/fb_img/38/s_103726_4532.jpg"
                                cover alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://my.kapook.com/imagescontent/fb_img/38/s_103726_4532.jpg"
                                cover alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://www.bot.or.th/English/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL17_20F_V2.gif"
                               cover alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://www.bot.or.th/English/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL17_50F_v2.gif"
                                cover alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://www.bot.or.th/English/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL17_100F_v2.gif"
                                cover alt="">
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://www.bot.or.th/English/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL17_500F_V2.gif"
                                cover alt="">
                            </div>
                            <div >
                                <img class="h-auto max-w-full rounded-lg" src="https://www.bot.or.th/English/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL17_1000F_V2.gif"
                                cover alt="">
                            </div>
                            
                        </div>
                       
                        <v-row> 
                            <v-card variant="outlined" justify="center" >

                            </v-card>
                        
                         
                        </v-row>
                     
                        <v-card-actions>
                    <v-btn color="red" variant="text" @click="pointOfSaleStore.dialogCash = false"> Cancle </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" variant="text" @click="close2Dialog()"> Clear </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green" variant="text" @click="close2Dialog()"> Confirm </v-btn>
                </v-card-actions>
                    </v-col>
                </v-row>
                
            </v-container>
        </v-card>
        
        
    </v-dialog>
</template>
<style scoped>
.scroll {
    max-height: 90vh;
    overflow: scroll;
}

.scroll::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}

.scroll::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 999px;
}
</style>

