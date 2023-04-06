
<script setup lang="ts">
import { useBillStore } from '@/store/bill.store';
import { useMaterialStore } from '@/store/material.store';
import type BILL from '@/store/types/bill';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const id = route.params.id


const showMat = ref<BILL>();
const billStore = useBillStore();

onMounted(async() => {
    billStore.getOneBill(id+'');
});
const dialog = ref(false);
const opendialog = (data:BILL) =>{
  dialog.value = true;
  showMat.value = data;


}
</script>
<template>
   <v-row class="ml-5" style="float:left">
  <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" title="material" value="material" to="/material"></v-btn></v-row>
    <VContainer>
    <VCard>
      <VCardTitle>
        Show Bill
        <VTable class="text-center mt-5">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Bill Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) of billStore.bill_detail" :key="index" class="text-center">
             <td>{{ index+1}}</td> 
             <td>{{ item.bill.name }}</td>
             <td>{{ new Date(item.bill.date+'').getDate()+'/'+new Date(item.bill.date+'').getMonth()+'/'+new Date(item.bill.date+'').getFullYear() }}</td>
             <td><v-btn @click="opendialog(item.bill)">Click</v-btn></td>
            </tr>
          </tbody>
          <tbody v-if="billStore.bill_Detail_List.length == 0" >
          <tr>
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
        </VTable>
      </VCardTitle>
      <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="billStore.page" :length="billStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
    </VCard>
  </VContainer>
  <v-dialog v-model="dialog">
    <v-container style="background-color: aliceblue;">
      <v-table class="text-center">
        <thead>
            <tr>BILL</tr>
        </thead>
        <tbody v-for="(item,index) of billStore.bill_detail" :key="index">
                <tr>Name: {{ item.name }}</tr>
                <tr>Amount: {{ item.amount }}</tr>
                <tr>Price: {{ item.price }}</tr>
                <tr>Total: {{ item.total }}</tr>
        </tbody>
      </v-table>
    </v-container>
  </v-dialog>
</template>

    