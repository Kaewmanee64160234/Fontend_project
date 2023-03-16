
<script lang="ts" setup>
import ChartComponentDialog from "../../components/dashboards/ChartComponentDialog.vue"
import SellerDialog from "../../components/stock/SellerDialog.vue"
</script>

<template>
  <a class="font">Dashbords</a>
        <v-row>
          <v-col cols="12" md="4">
            <ChartComponentDialog></ChartComponentDialog>
          </v-col>
          <v-col cols="12" md="4">
            <ChartComponentDialog></ChartComponentDialog>
          </v-col>
          <v-col cols="12" md="4">
            <ChartComponentDialog></ChartComponentDialog>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            สินค้าขายดี
            <SellerDialog></SellerDialog>
          </v-col>
          <v-col cols="12" md="4">
            สินค้ายอดขายน้อย
            <SellerDialog></SellerDialog>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
            สินค้าใกล้หมดสต็อก
            <v-table style="margin-bottom: 2;">
              <thead>
                <tr>
                  <th scope="col" class="text-center">No.</th>
                  <th scope="col" class="text-center">ชื่อ</th>
                  <th scope="col" class="text-center">จำนวน</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="text-align: center">1</td>
                  <td style="text-align: center">คุกกี้ </td>
                  <td style="text-align: center">4 </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
          
          
          </v-col>
        </v-row>
      

</template>

<style>
.font {
  font-size: 200%;
}

</style>