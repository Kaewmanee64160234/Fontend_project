
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

onMounted(async () => {
  billStore.getOneBill(id + '');
});
const dialog = ref(false);
const opendialog = (data: BILL) => {
  dialog.value = true;
  showMat.value = data;

}
</script>
<template>
  <v-row class="ml-5" style="float:left">
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
            <tr v-for="(item, index) of billStore.bill_Detail" :key="index" class="text-center">
              <td>{{ index + 1 }}</td>
              <td>{{ item.bill.name }}</td>
              <td>{{ new Date(item.bill.date + '').getDate() + '/' + new Date(item.bill.date + '').getMonth() + '/' + new
                Date(item.bill.date + '').getFullYear() }}</td>
              <td><v-btn style="background-color: #8D6E63; color: white;" variant="text" rounded="xl" @click="opendialog(item.bill)">Click</v-btn></td>
            </tr>
          </tbody>
          <tbody v-if="billStore.bill_Detail.length == 0">
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
      <v-card class="mx-auto" max-width="500" max-height="500"><br>
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title" style="text-align: center;"><strong>Bill Detail</strong></h3>
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-condensed">
                    <thead>
                      <tr>
                        <td><strong>ID</strong></td>
                        <td class="text-center"><strong>NAME</strong></td>
                        <td class="text-center"><strong>AMOUNT</strong></td>
                        <td class="text-center"><strong>PRICE</strong></td>
                        <td class="text-right"><strong>TOTAL</strong></td>
                      </tr>
                    </thead>
                    <tbody v-for="(item, index) of billStore.bill_Detail" :key="index">
                      <!-- foreach ($order->lineItems as $line) or some such thing here -->
                      <tr>
                        <td>{{ index+1 }}</td>
                        <td class="text-center">{{ item.name }}</td>
                        <td class="text-center">{{ item.amount }}</td>
                        <td class="text-center">{{ item.price }}</td>
                        <td class="text-right">{{ item.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </v-card>
    </v-container>
  </v-dialog>
</template>

<style scoped>
.invoice-title h2,
.invoice-title h3 {
  display: inline-block;
}

.table>tbody>tr>.no-line {
  border-top: none;
}

.table>thead>tr>.no-line {
  border-bottom: none;
}

.table>tbody>tr>.thick-line {
  border-top: 2px solid;
}
</style>

    