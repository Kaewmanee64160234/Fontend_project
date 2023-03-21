
<script lang="ts" setup>
import ChartComponentDialog from "../../components/dashboards/ChartComponentDialog.vue"
import SellerDialog from "../../components/stock/SellerDialog.vue"
</script>

<template>
  <v-row class="ml-5" style="float:left">
    <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" title="Home" value="home" to="/home">
    </v-btn>
  </v-row>
  <div class="page">
    <a class="font">Dashbords</a>
    <v-row>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
            ยอดขายรายวัน
            <ChartComponentDialog :background="`rgb(151, 222, 255,0.4)`" :color="`#62CDFF`" :dataValues="[30, 50, 40, 45, 50, 40, 32, 60, 40, 20, 30, 50]" :dataLabels="[
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat'
            ]" label="Days"></ChartComponentDialog>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
            ยอดขายรายเดือน
            <ChartComponentDialog :background="`rgb(237, 241, 214,0.5)`" :color="`#609966`" :dataValues="[100, 200, 300, 400, 500, 450, 320, 600, 400, 200, 300, 500]" :dataLabels="[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]" label="Months"></ChartComponentDialog>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
            ยอดขายรายปี
            <ChartComponentDialog :background="`rgb(241, 103, 103,0.3)`" :color="`#F16767`"  :dataValues="[200, 300, 400]" :dataLabels="[
              '2020',
              '2021',
              '2023'
            ]" label="Years"></ChartComponentDialog>
          </v-card>
        </v-container>
      </v-col>

    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
            สินค้าขายดี
            <SellerDialog></SellerDialog>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
            สินค้ายอดขายน้อย
            <SellerDialog></SellerDialog>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
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
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.font {
  font-size: 200%;
}

.page {
  max-height: 90vh;
  overflow: scroll;
}

.page::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.page::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 999px;
}
</style>