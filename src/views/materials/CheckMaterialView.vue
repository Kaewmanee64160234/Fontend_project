<<<<<<< HEAD
<script lang="ts" setup>
import type checkmaterial from '@/services/checkmaterial';
import { useCheckMaterialStore } from '@/store/checkmaterial.store';
import { useCheckMaterailDetailStore } from '@/store/checkmaterialdetail.store';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const checkmaterialStore = useCheckMaterialStore()
onMounted(() => {
    checkmaterialStore.getOneCheckMatrial(id + '')
=======
<script setup lang="ts">
import { useBillStore } from '@/store/bill.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const billStore = useBillStore();

onMounted(() => {
  billStore.getBills()
>>>>>>> 2eaa9b70f0ecb3969068d6356c88b99005d4e65b
})

</script>
<<<<<<< HEAD
<template >
    <table class="body-wrap">
      <tbody>
        <tr>
          <td></td>
          <td class="container" width="600">
            <div class="content">
              <table class="main" width="100%" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr>
                    <td class="content-wrap aligncenter">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td class="content-block">
                            </td>
                          </tr>
                          <tr>
                            <td class="content-block">
                              <table class="invoice">
                                <tbody>
                                  <tr>
                                    <td>employee id: {{ checkmaterialStore.checkMaterial.employeeId }}<br />Date :{{ checkmaterialStore.checkMaterial.createdAt }}<br /> time: {{ checkmaterialStore.checkMaterial.time }}</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table class="invoice-items" cellpadding="0" cellspacing="0">
                                        <tbody >
                                          <tr v-for="item in checkmaterialStore.checkMaterial.checkmaterialdetails" :key="item.name">
                                            <td>{{ item.name }}</td>
                                            <td class="alignright">{{ item.checkmaterialID }} </td>
                                            <td class="alignright">{{item.qty_last}} </td>
                                            <td class="alignright">{{item.qty_remain}} </td>
                                          </tr>
                                          <tr class="finishOrder" >
                                            <td>Name</td>
                                     
                                          </tr>
                                          
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                         
                          <tr>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </template>
=======
<template>
    <div>Check Material {{ id }}</div>
    <v-container>
        <v-card>
            <v-card-title> BIll
               <v-table>
                <v-row>
                    <v-col>
                    </v-col>
                </v-row>
               </v-table>
            </v-card-title>
        </v-card>
    </v-container>
</template>
>>>>>>> 2eaa9b70f0ecb3969068d6356c88b99005d4e65b
