
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
          <v-card width="400px" style="font-size:140%;">
            Daily Sales
            <ChartComponentDialog :background="`rgb(75,123,229)`" :color="`#62CDFF`" :dataValues="[30, 50, 40, 45, 50, 40, 32, 60, 40, 20, 30, 50]" :dataLabels="[
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
          <v-card width="400px" style="font-size:140%;">
            Monthly Sales
            <ChartComponentDialog :background="`rgb(235,176,45)`" :color="`#609966`" :dataValues ="[100, 200, 300, 400, 500, 450, 320, 600, 400, 200, 300, 500]" :dataLabels="[
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
          <v-card width="400px" style="font-size:140%;">
            Annual sales
            <ChartComponentDialog :background="`rgb(246, 110, 110,1)`" :color="`#F16767`"  :dataValues="[200, 300, 400]" :dataLabels="[
              '2020',
              '2021',
              '2023'
            ]" label="Years" 
            
            ></ChartComponentDialog>
          </v-card>
        </v-container>
      </v-col>

    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
            The best seller
            <SellerDialog></SellerDialog>
          </v-card>
        </v-container>
      </v-col>

      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px">
            The product is almost out of stock
            <v-table style="margin-bottom: 2;">
              <thead>
                <tr>
                  <th scope="col" class="text-center">No.</th>
                  <th scope="col" class="text-center">Name</th>
                  <th scope="col" class="text-center">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="text-align: center">1</td>
                  <td style="text-align: center">Cookie </td>
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