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
})

</script>
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