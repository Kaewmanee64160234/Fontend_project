
<script setup lang="ts">
import { useBillStore } from '@/store/bill.store';
import { useMaterialStore } from '@/store/material.store';
import type BILL from '@/store/types/bill';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const id = route.params.id


const showMat = ref();
const billStore = useBillStore();

onMounted(async () => {
  billStore.getOneBill(id + '');
});
const dialog = ref(false);
const opendialog = (data: any) => {
  dialog.value = true;
  showMat.value = data;

}
</script>
<template>
  <v-row class="ml-5 mt-5" style="float:left">
    <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" title="material" value="material"
      to="/material"></v-btn></v-row>
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
            <tr v-for="(item, index) of billStore.billItem" :key="index" class="text-center">
              <td>{{ index + 1 }}</td>
              <td>{{ item.bill.name }}</td>
              <td>{{ new Date(item.createdAt + '').getDate() + '/' + new Date(item.createdAt + '').getMonth() + '/' + new
                Date(item.createdAt + '').getFullYear() }}</td>
              <td><v-btn style="background-color: #8D6E63; color: white;" variant="text" rounded="xl"
                  @click="opendialog(item.bill.bill_detail)">Click</v-btn></td>
            </tr>
          </tbody>
          <tbody v-if="billStore.billItem?.length == 0">
            <tr>
              <td colspan="7" class="text-center">No data</td>
            </tr>
          </tbody>
        </VTable>
      </VCardTitle>
      <v-container width="100%" justify="center">

        <v-pagination justify="center" v-model="billStore.page" :length="billStore.lastPage"
          rounded="circle"></v-pagination>

      </v-container>
    </VCard>
  </VContainer>
  <v-dialog v-model="dialog">
    <v-container>
      <v-card rounded="xl" class="mx-auto" max-width="500" style="background-color: #4E342E; color: white;"><br>
        <h1 text-color="primary" class="text-center" style="font-size: large ;">Details</h1><br>
        <v-list lines="one" style="background-color: #EFEBE9">

          <v-list-item rounded="xl" v-for="(item, index) of showMat " :key="index">
            <v-list style="background-color: #EFEBE9">
              <li>Material Name: {{ item.name }}</li>
            
              <li>Amount: {{ item.amount }} </li>
            
              <li>Price: {{ item.price }} </li>
            
              <li>Total: {{ item.total }} </li>
              <li>Date: {{ new Date(item.createdAt + '').getDate() + '/' + new
                Date(item.createdAt + '').getMonth() + '/' + new Date(item.createdAt + '').getFullYear()
              }}</li>
            </v-list> <br>
          </v-list-item>
            <div style="text-align: right; padding-right: 0px;">
              <VBtn style="background-color: #E53935; color: white;margin-right: 20px;margin-bottom: 10px" variant="text" rounded="xl" @click="dialog = false">
              Close</VBtn>
          </div>
      </v-list>


    </v-card>
  </v-container>
</v-dialog>
</template>


