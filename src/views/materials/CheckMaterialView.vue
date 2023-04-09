<script setup lang="ts">
import AddCheckMaterialDialog from '@/components/material/AddCheckMaterialDialog.vue';
import { useCheckMaterialStore } from '@/store/checkmaterial.store';
import { useManageTime } from '@/store/manageDate';
import type BILL from '@/store/types/bill';
import type BILL_DETAIL from '@/store/types/billdetail';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const checkMaterialStore = useCheckMaterialStore();
const manageTimeStore = useManageTime();


const route = useRoute()
const id = route.params.id
const checkMatDe = ref();
// const insert = 
onMounted(() => {
  checkMaterialStore.getOneCheckMatrial(id + '')
})
const dialog = ref(false);
const opendialog = (data:any) => {
  dialog.value = true;
  checkMatDe.value =   data;


}
const date = (index: string) => {
  let dd = new Date(index);
  let date = { date: '', mouth: '', year: '', hour: '', minute: '', second: '' }
  date.year = dd.getFullYear() + ''
  date.date = dd.getDate() + ''
  date.mouth = dd.getMonth() + ''
  date.minute = '' + dd.getMinutes()
  date.hour = '' + dd.getHours()
  date.second = '' + dd.getSeconds()
  if (dd.getDate() < 10) {
    date.date = '0' + dd.getDate()
  } if (dd.getMonth() < 10) {
    date.mouth = '0' + dd.getMonth()
  }
  if (dd.getHours() < 10) {
    date.hour = '0' + dd.getHours()
  }
  if (dd.getMinutes() < 10) {
    date.minute = '0' + dd.getHours()
  }
  if (dd.getSeconds() < 10) {
    date.second = dd.getSeconds() + '0'
  }
  return date;
}
</script>
<template>
  <AddCheckMaterialDialog></AddCheckMaterialDialog>
  <v-row class="ml-5" style="float:left">
  <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" title="material" value="material" to="/material"></v-btn></v-row>
  <VContainer>
    
    <VCard>
      <VCardTitle>
        Check Material
              <v-btn class="mdi mdi-plus" style="float: right; background-color: #8ad879; color: white"
          @click="checkMaterialStore.dialog = true">Add New Check Material</v-btn>
        <VTable class="text-center mt-5">

          <thead>
            <tr>
              <th>Check Material ID</th>
              <th>Material Date</th>
              <th>Material Detail</th>
            </tr>
          </thead>
         <!-- {{ checkMaterialStore.checkMatItem }} -->
         
         <tbody>
            <tr v-for="(item, index) in  checkMaterialStore.checkMatItem" :key="index" class="text-center">
           <td>{{ index+1}}</td> 
              <td>{{ new Date(item.createdAt + '').getDate() + '/' + new Date(item.createdAt + '').getMonth() + '/' + new
                Date(item.createdAt + '').getFullYear() }}</td>
           <td><v-btn style="background-color: #8D6E63; color: white;" variant="text" rounded="xl" @click="opendialog(item.checkmaterial.checkmaterialdetails)">Click</v-btn></td> 



            </tr>
          </tbody>
          <tbody v-if=" checkMaterialStore.checkMatItem && checkMaterialStore.checkMatItem.length === 0">
            <tr>
              <td colspan="7" class="text-center">No data</td>
            </tr>
          </tbody>
        </VTable>
      </VCardTitle>
      <v-container width="100%" justify="center">
        <v-pagination justify="center" v-model="checkMaterialStore.page" :length="checkMaterialStore.lastPage"
          rounded="circle"></v-pagination>
      </v-container>
    </VCard>
  </VContainer>

  <v-dialog v-model="dialog">
    <v-container>
      <v-card rounded="xl" class="mx-auto" max-width="500" style="background-color: #4E342E; color: white;"><br>
        <h1 text-color="primary" class="text-center" style="font-size: large ;">Details</h1><br>
        <v-list lines="one" style="background-color: #EFEBE9">
          <v-list-item rounded="xl" v-for="(item, index) of checkMatDe " :key="index">
            <v-list style="background-color: #EFEBE9"><li>Materail Name: {{ item.name }}</li></v-list> <br>
            <v-list style="background-color: #EFEBE9"><li>Last Quantity: {{ item.qty_last }} </li></v-list><br>
            <v-list style="background-color: #EFEBE9"><li>Expire Quantity: {{ item.qty_expire }} </li></v-list><br>
            <v-list style="background-color: #EFEBE9"><li>Remain Quantity: {{ item.qty_remain }} </li></v-list><br>
            <v-list style="background-color: #EFEBE9"><li>Date: {{ new Date(item.createdAt + '').getDate() + '/' + new
              Date(item.createdAt + '').getMonth() + '/' + new Date(item.createdAt + '').getFullYear()
            }}</li></v-list> <br>
         <div style="text-align: right; padding-right: 0px;">
  <VBtn style="background-color: #E53935; color: white;" variant="text" rounded="xl" @click="dialog = false">Close</VBtn>
</div>
          </v-list-item>
        </v-list>
      </v-card>


      <!-- {{ item.name }}
          {{ item.qty_last }}
          {{ item.qty_expire }}
          {{ item.qty_remain }} -->

    </v-container>
  </v-dialog>
</template>