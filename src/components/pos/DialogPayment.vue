<script setup lang="ts">
import { usePointOfSale } from '@/store/pointOfSell.store'
const pointOfSaleStore = usePointOfSale()
const close2Dialog = () => {
  pointOfSaleStore.dialogPayment = false;
  pointOfSaleStore.order.payment = 'promptpay'
}
</script>
<template>
  <v-dialog v-model="pointOfSaleStore.dialogPayment" persistent width="230px">
          <v-card>
            <v-card class="mx-auto" max-width="230">
            <v-img src="../../../public/img/214039.jpg" height="200px" width="230px" cover></v-img>
            <v-card-subtitle> Please check the amount</v-card-subtitle>

            <v-card-actions>
              <v-btn color="red" variant="text" @click="pointOfSaleStore.dialogPayment = false"> Cancle </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="green" variant="text" @click="close2Dialog()"> Finish </v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
        </v-dialog>
</template>


