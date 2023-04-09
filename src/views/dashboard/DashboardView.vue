
<script lang="ts" setup>
import ChartComponentDialog from "../../components/dashboards/ChartComponentDialog.vue"
import DonutDialog from "@/components/dashboards/DonutDialog.vue";
</script>

<template>
  <v-row class="ml-5" style="float:left">
    <v-btn color="#F1DEC9" class="mr-5" icon="mdi mdi-keyboard-backspace" title="Home" value="home" to="/home">
    </v-btn>
  </v-row>
  <v-card>
  <div class="page">
    <v-card-title class="text-center">
    <a class="font" >Dashboards</a>
  </v-card-title>
    <v-row>
      <v-col cols="6" md="8">
        <v-container>
          <v-card class="text-center" width="900px" style="font-size:140%;">
            Daily Sales
            <ChartComponentDialog type="line" :color="`#62CDFF`" :dataValues="[30, 55, 25, 45, 50, 40, 32]"
              :dataLabels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" label="Product"
              :dataLabels2="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :dataValues2="[30, 30, 30, 30, 40, 50, 60]"
              label2="Customer" :color2="`#FA9884`" :dataLabels3="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
              :dataValues3="[60, 50, 40, 40, 40, 30, 20]" label3="year" :color3="`#B2A4FF`">
            </ChartComponentDialog>
          </v-card>
        </v-container>
      </v-col>
      <v-col style="margin-top: 10px;">
        <select label="Select" :items="['YEAR', 'MONTH', 'DAY']" style="width: 200px;"
        class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white">
        <option selected>Select</option>
        <option value="US">Year</option>
        <option value="CA">Month</option>
          <option value="FR">Day</option>
        </select>
        <div style="margin-top: 20px;">
        <select :items="['DRINK', 'FOODS', 'DESSERTS']" style="width: 200px;"
        class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white">
        <option selected>Drink</option>
        <option value="US">Foods</option>
        <option value="CA">Desserts</option>
        </select>
      </div>
      <div style="margin-top: 20px;">
        <select :items="['DRINK', 'FOODS', 'DESSERTS']" style="width: 200px;"
        class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white">
        <option selected>Drink</option>
        <option value="US">Foods</option>
        <option value="CA">Desserts</option>
        </select>
      </div>
        <v-btn style="margin-top: 20px; ;width: 200px;background-color: #8ad879; color: white">SUBMIT</v-btn>
      </v-col>
      
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px" class="text-center">
            The best seller
            <DonutDialog :color="[
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ]" :dataValues="[30, 55, 25, 45, 50]" :dataLabels="['Cake', 'Soda', 'Coffee', 'Waffle', 'Coco']"
              label="Product">
            </DonutDialog>
          </v-card>
        </v-container>
      </v-col>

      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px" max-height="424px" class="text-center">
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

      <v-col cols="12" md="4">
        <v-container>
          <v-card width="400px" max-height="424px" class="text-center">
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
</v-card>
</template> 

<style>
.font {
  font-size: 200%;
  text-align: center;
}

.page {
  margin-top: 5px;
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