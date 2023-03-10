<script setup lang="ts">
import { usePointOfSale } from '@/store/pointOfSell.store'

const pointOfSaleStore = usePointOfSale()
</script>
<template>
  <v-dialog v-model="pointOfSaleStore.dialog" persistent width="600">
    <v-card >
      <v-row justify="space-around">
        <v-col cols="4">
          <v-card width="200px" height="200px" class="ma-3">

        <template v-slot:subtitle> This is a subtitle </template>

        <template v-slot:text> This is content </template>
      </v-card>
        </v-col>
       <v-col cols="4" class="ma-3">
        <v-card width="200px"  height="200px">

          <v-img
              src="https://play-lh.googleusercontent.com/UIdkgBTFEFYTbE-_hUnekG5Aq16au9J7C6RI5gnoAeEZV2zMC3XgOnjL-0aYdmyWk6k=w240-h480-rw"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white" :v-text="`Promtpay`"></v-card-title>
            </v-img>
      </v-card>
       </v-col>
    
      </v-row>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="pointOfSaleStore.dialog = false">
          Disagree
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="pointOfSaleStore.dialog = false">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
