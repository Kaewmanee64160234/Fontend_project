
<script setup lang="ts">
import { useCheckMaterialStore } from '@/store/checkmaterial.store';

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
              
              <th>Material ID</th>
              <th>Material Date</th>
              <th>Material Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) of checkMaterialStore.checkmeterials" :key="index" class="text-center">
              <td>{{index+1}}</td>
              <td>{{item.createdAt}}</td>
              <td>{{item.createdAt }}</td>
            </tr>
          </tbody>
          <tbody v-if="checkMaterialStore.checkmeterials.length == 0" >
          <tr>
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
        </VTable>
      </VCardTitle>
    </VCard>
  </VContainer>
</template>

    