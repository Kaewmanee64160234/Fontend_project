
<script setup lang="ts">
import { useCheckMaterialStore } from '@/store/checkmaterial.store';
import { useCheckMaterailDetailStore } from '@/store/checkmaterialdetail.store';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const checkMaterialStore = useCheckMaterialStore();


const route = useRoute()
const id = route.params.id
onMounted(() => {
  checkMaterialStore.getOneCheckMatrial(id+'')

})

</script>
<template>
    <VContainer>
    <VCard>
      <VCardTitle>

        Check Material
        <VTable class="text-center mt-5">
          <thead>
            <tr>
              <th>Check Material ID</th>
              <th>Materail Name</th>
              <th>Last Quantity</th>
              <th>Remain Quantity</th>
              <th>Expire Quantity</th>
              <th>Material Date</th>
              <th>Material Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) of checkMaterialStore.checkmeterialDetail" :key="index" class="text-center">
              <td>{{ index+1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{item.qty_last}}</td>
              <td>{{item.qty_remain}}</td>
              <td>{{item.qty_expire}}</td>
              <td>{{item.createdAt}}</td>
              <td>{{item.createdAt }}</td>


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
</template>

    