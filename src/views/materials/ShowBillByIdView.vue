
<script setup lang="ts">
import { useCheckMaterialStore } from '@/store/checkmaterial.store';
import type BILL from '@/store/types/bill';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const checkMaterialStore = useCheckMaterialStore();


const route = useRoute()
const id = route.params.id
const checkMat = ref<BILL>();
onMounted(() => {
  checkMaterialStore.getOneCheckMatrial(id+'')

})
const dialog = ref(false);
const opendialog = (data:BILL) =>{
  dialog.value = true;
  checkMat.value = data;


}
</script>
<template>
    <VContainer>
    <VCard>
      <VCardTitle>

        Check Material
        <VTable class="text-center mt-5">
          <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) of checkMaterialStore.checkmeterialDetail" :key="index" class="text-center">
              <!-- <td>{{ index+1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{item.qty_last}}</td>
              <td>{{item.qty_remain}}</td>
              <td>{{item.qty_expire}}</td>
              <td>{{item.createdAt}}</td>
              <td>{{item.createdAt }}</td> -->
             <td>{{ index+1}}</td> 
             <td>
              {{  }}

             </td> 
             <td><v-btn >Click</v-btn></td>


            </tr>
          </tbody>
          <tbody v-if="checkMaterialStore.checkmeterialDetail.length == 0" >
          <tr>
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
        </VTable>
      </VCardTitle>
      <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="checkMaterialStore.page" :length="checkMaterialStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
    </VCard>
  </VContainer>
  <v-dialog v-model="dialog">
    <v-container style="background-color: aliceblue;">
      {{ checkMat }}

    </v-container>
  </v-dialog>
</template>

    