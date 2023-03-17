<script lang="ts" setup>
import { usePointOfSale } from '@/store/pointOfSell.store';
import { onMounted, ref } from 'vue';
import { useCustomerStore } from '@/store/customer.store'

const customerStore = useCustomerStore()
const pointOfSaleStore =  usePointOfSale();
let namePromotion = ref("");
let CodeInput = ref("");

const showName = (namePromo: string) => {
  namePromotion.value = namePromo;
}
const reCode = () => {
  CodeInput = ref("");
  namePromotion.value = "";
}
onMounted(() => {
  customerStore.getCustomers()
})

</script>

<template>
  <v-dialog v-model="pointOfSaleStore.dialogPromotion" persistent width="900">
    <v-card>
      <v-card-title >
        <span class="text-h5">Promotion</span>
      </v-card-title>
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
        </v-card-text>
        <v-card-title>
          <span class="text-h5">{{ namePromotion }}</span>
        </v-card-title>
        <v-container>
            <v-row >
             <v-col cols="12">
              <v-text-field
            label="กรุณากรอก Code ⭐"
            required
            v-model="CodeInput"
            :rules="[
                    (v) => !!v || 'Item is required',
                  ]">
          </v-text-field></v-col>
            </v-row>
          </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="pointOfSaleStore.dialogPromotion = false,reCode()">
          Close
        </v-btn>
        <v-btn color="primary" variant="text" @click="pointOfSaleStore.checkCode(CodeInput),reCode()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
