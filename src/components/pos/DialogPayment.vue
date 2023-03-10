<script setup lang="ts">
import { usePointOfSale } from '@/store/pointOfSell.store'
const pointOfSaleStore = usePointOfSale()
const close2Dialog = ()=>{
  pointOfSaleStore.dialogPayment = false;
  pointOfSaleStore.dialogPrompypay = false;
}
</script>
<template>
  <v-dialog v-model="pointOfSaleStore.dialogPayment" persistent width="600px">
    <v-card>
      <v-card-title>💰 Select payment 💰</v-card-title>
      <v-row justify="space-around" class="pa-5">
        <v-col cols="4">
          <v-card @click="pointOfSaleStore.dialogPrompypay = true">
            <v-img
              :lazy-src="`https://play-lh.googleusercontent.com/UIdkgBTFEFYTbE-_hUnekG5Aq16au9J7C6RI5gnoAeEZV2zMC3XgOnjL-0aYdmyWk6k=w240-h480-rw`"
              src="https://play-lh.googleusercontent.com/UIdkgBTFEFYTbE-_hUnekG5Aq16au9J7C6RI5gnoAeEZV2zMC3XgOnjL-0aYdmyWk6k=w240-h480-rw"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              width="250px"
              cover
            >
              <v-card-title style="color: aliceblue">Prompt pay</v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-img
              :lazy-src="`https://media.bizj.us/view/img/10352497/pileofmoney*1200xx2033-1144-249-431.jpg`"
              src="https://media.bizj.us/view/img/10352497/pileofmoney*1200xx2033-1144-249-431.jpg"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              width="250px"
              cover
            >
              <v-card-title style="color: aliceblue">Cash</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="pointOfSaleStore.dialogPayment = false">
          Cancel
        </v-btn>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="pointOfSaleStore.dialogPayment = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="pointOfSaleStore.dialogPrompypay">
    <v-card class="mx-auto" max-width="344">
      <v-img src="../../../public/img/214039.jpg" height="200px" width="230px" cover></v-img>


      <v-card-subtitle> เช็คยอดเงินก่อนกดยืนยัน </v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="orange-lighten-2" variant="text" @click="close2Dialog()"> Finish </v-btn>

      </v-card-actions>

     
    </v-card>
  </v-dialog>
</template>
