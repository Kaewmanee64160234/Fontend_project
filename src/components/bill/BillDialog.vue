<script setup lang="ts">
import { useMaterialStore } from '@/store/material.store';
import type { BillDetail } from '@/store/types/BillDetail.type';
import { ref } from 'vue';

const materiaStore = useMaterialStore();
const billDettailList = ref<BillDetail[]>([{ name: 'test',amount:3,price:2}]);
const addBillDetail = () => {
  const newdetail = ref<BillDetail>({ name: 'test',amount:3,price:2});
  billDettailList.value.push(newdetail.value);

}
const deleteBillDetail = (index: number) => {
  billDettailList.value.splice(index, 1);
  // console.log(index);
}

</script>
<template>
  <v-dialog 
      v-model="materiaStore.BillDialog"
      width="80vw"
    >
      <v-card>
        <v-card-text style="overflow-y: auto;">
          <v-container width="80%">
            <v-card class="pa-5 ma-2" v-for="(item,index) in billDettailList" :key="index">
            <v-card-title><p>Bill detail {{ index+1 }}</p></v-card-title>
              <v-text-field
        v-model="item.name"
        label="Name"
      ></v-text-field> 
      <v-text-field
        v-model="item.price"
        label="Name"
      ></v-text-field> 
      <v-text-field
        v-model="item.amount"
        label="Name"
      ></v-text-field> 
      <v-card-actions>
        <v-spacer>

        </v-spacer>
        <v-btn color="ref" @click="deleteBillDetail(index)">Delete</v-btn>
      </v-card-actions>
          </v-card>
        
          </v-container>


        </v-card-text>
        <v-btn
  color="success"
  class="ma-4"
  block
  @click="addBillDetail"
>
  Add Bill Detail
</v-btn>
        <v-card-actions>
          <v-btn color="primary" block @click="materiaStore.BillDialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style scoped> 
.dialog{
    width: 50vw;
    
}
</style>