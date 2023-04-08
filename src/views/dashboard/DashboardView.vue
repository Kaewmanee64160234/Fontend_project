
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
    <a class="font">Dashboards</a>
    <v-row>
      <v-col cols="6" md="8" >
        <v-container>
          <v-card width="900px" style="font-size:140%;">
            Daily Sales
            <ChartComponentDialog 
              type="line" :color="`#62CDFF`"
              :dataValues="[30, 55, 25, 45, 50, 40, 32]" 
              :dataLabels="['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" 
              label="Product" 
              :dataLabels2="['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" 
              :dataValues2="[30, 30, 30, 30, 40, 50, 60]" 
              label2="Customer" :color2="`#FA9884`"
              :dataLabels3="['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" 
              :dataValues3="[60, 50, 40, 40, 40, 30, 20]" 
              label3="ya" :color3="`#B2A4FF`"
              >
            </ChartComponentDialog>
          </v-card>
      </v-container>
    </v-col>
    <v-col>
            <v-autocomplete
              label="Select"
              :items="['YEAR', 'MONTH', 'DAY']"
              density="compact"
              style="width: 400px;"
            >
              <v-autocomplete>Drinks</v-autocomplete>
              <v-autocomplete>Drinks</v-autocomplete>
              <v-autocomplete>Foods</v-autocomplete>
              <v-autocomplete>Desserts</v-autocomplete>
          </v-autocomplete>
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