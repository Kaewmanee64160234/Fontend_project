<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ChartComponentDialog from '../../components/dashboards/ChartComponentDialog.vue'
import DonutDialog from '@/components/dashboards/DonutDialog.vue'
import { useProductStore } from '@/store/product.store'
import { useReport } from '@/store/report.store'
const productStore = useProductStore()
const reportStore = useReport()
const selectedItem = ref('')
onMounted(() => {
  productStore.take = 41
  productStore.getProducts()
  reportStore.getReport()
})
</script>

<template>
  <v-row class="ml-5 mt-5" style="float: left">
    <v-btn
      color="#F1DEC9"
      class="mr-5"
      icon="mdi mdi-keyboard-backspace"
      title="Home"
      value="home"
      to="/home"
    >
    </v-btn>
  </v-row>
  <v-card>
    <div class="page">
      <v-card-title class="text-center">
        <a class="font">Dashboards</a>
        <!-- {{ reportStore.dataValueE }} -->
      </v-card-title>
      <v-row>
        <v-col cols="6" md="8">
          <v-container>
            <v-card class="text-center" width="900px" style="font-size: 140%">
              Daily Sales
              <ChartComponentDialog
                type="line"
                :color="`#62CDFF`"
                :dataValues="[262320, 550872, 262320, 209856, 262320, 209856, 157392]"
                :dataLabels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                label="Espresso"
                :data-values2="[
                  142320.0, 298872.0, 142320.0, 113856.0, 142320.0, 113856.0, 85392.0
                ]"
                label2="Shrimp Salad"
                color2="#E21818"
                :data-labels2="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
              >
              </ChartComponentDialog>
            </v-card>
          </v-container>
        </v-col>
        <v-col style="margin-top: 10px">
          <v-radio-group v-model="selectedItem">
            <v-radio label="YEAR" value="year"></v-radio>
            <v-radio label="MONTH" value="month"></v-radio>
            <v-radio label="DAY" value="day"></v-radio>
          </v-radio-group>
          <div style="margin-top: 20px" v-if="selectedItem == 'year'">
            <select
              :items="['2023']"
              style="width: 200px"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white"
            >
              <option selected>SELECT</option>
              <option value="US">2023</option>
            </select>
          </div>
          <div style="margin-top: 20px" v-if="selectedItem == 'month'">
            <select
              :items="[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
              ]"
              style="width: 200px"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white"
            >
              <option selected>SELECT</option>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
          </div>
          <div style="margin-top: 20px" v-if="selectedItem == 'day'">
            <select
              :items="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
              style="width: 200px"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white"
            >
              <option selected>SELECT</option>
              <option value="Sun">Sunday</option>
              <option value="Mon">Monday</option>
              <option value="Tur">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thu">Thursday</option>
              <option value="Fri">Friday</option>
              <option value="Sat">Saturday</option>
            </select>
          </div>
          <div style="margin-top: 20px">
            <select
              :items="[productStore.products]"
              style="width: 200px"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white"
            >
              <option v-for="item in productStore.products" :key="item.id">{{ item.name }}</option>
            </select>
          </div>
          <div style="margin-top: 20px">
            <select
              :items="[productStore.products]"
              style="width: 200px"
              class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white"
            >
              <option v-for="item in productStore.products" :key="item.id">{{ item.name }}</option>
            </select>
          </div>
          <v-btn style="margin-top: 20px; width: 200px; background-color: #8ad879; color: white"
            >SUBMIT</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-container>
            <v-card width="400px" class="text-center">
              The best seller
              <DonutDialog
                :color="[
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)'
                ]"
                :dataValues="[30, 55, 25, 45, 50]"
                :dataLabels="['Cake', 'Soda', 'Coffee', 'Waffle', 'Coco']"
                label="Product"
              >
              </DonutDialog>
            </v-card>
          </v-container>
        </v-col>

        <v-col cols="12" md="4">
          <v-container>
            <v-card
              width="400px"
              max-height="430px"
              class="text-center"
              style="background-color: #5c8d89"
            >
              The product is best seller of stock
              <v-table style="margin-bottom: 2">
                <thead>
                  <tr>
                    <th scope="col" class="text-center" style="background-color: #86aba1">No.</th>
                    <th scope="col" class="text-center" style="background-color: #86aba1">Name</th>
                    <th scope="col" class="text-center" style="background-color: #86aba1">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align: center; background-color: #dff3e3">1</td>
                    <td style="text-align: center; background-color: #dff3e3">Cocoa</td>
                    <td style="text-align: center; background-color: #dff3e3">52</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #dff3e3">2</td>
                    <td style="text-align: center; background-color: #dff3e3">American rice</td>
                    <td style="text-align: center; background-color: #dff3e3">48</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #dff3e3">3</td>
                    <td style="text-align: center; background-color: #dff3e3">Dumplings</td>
                    <td style="text-align: center; background-color: #dff3e3">45</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #dff3e3">4</td>
                    <td style="text-align: center; background-color: #dff3e3">Donut</td>
                    <td style="text-align: center; background-color: #dff3e3">42</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #dff3e3">5</td>
                    <td style="text-align: center; background-color: #dff3e3">Frenchfries</td>
                    <td style="text-align: center; background-color: #dff3e3">41</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #dff3e3">6</td>
                    <td style="text-align: center; background-color: #dff3e3">Steak</td>
                    <td style="text-align: center; background-color: #dff3e3">40</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #dff3e3">7</td>
                    <td style="text-align: center; background-color: #dff3e3">Cookies</td>
                    <td style="text-align: center; background-color: #dff3e3">38</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-container>
        </v-col>

        <v-col cols="12" md="4">
          <v-container>
            <v-card
              width="400px"
              max-height="430px"
              class="text-center"
              style="background-color: #cc7351"
            >
              The product is almost out of stock
              <v-table style="margin-bottom: 2">
                <thead>
                  <tr>
                    <th scope="col" class="text-center" style="background-color: #e08f62">No.</th>
                    <th scope="col" class="text-center" style="background-color: #e08f62">Name</th>
                    <th scope="col" class="text-center" style="background-color: #e08f62">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align: center; background-color: #f7d1ba">1</td>
                    <td style="text-align: center; background-color: #f7d1ba">
                      Vegetables Smoothie
                    </td>
                    <td style="text-align: center; background-color: #f7d1ba">3</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #f7d1ba">2</td>
                    <td style="text-align: center; background-color: #f7d1ba">Espresso</td>
                    <td style="text-align: center; background-color: #f7d1ba">8</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #f7d1ba">3</td>
                    <td style="text-align: center; background-color: #f7d1ba">Kiwi Juice</td>
                    <td style="text-align: center; background-color: #f7d1ba">10</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #f7d1ba">4</td>
                    <td style="text-align: center; background-color: #f7d1ba">Egg Soup</td>
                    <td style="text-align: center; background-color: #f7d1ba">11</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #f7d1ba">5</td>
                    <td style="text-align: center; background-color: #f7d1ba">Shrimp Salad</td>
                    <td style="text-align: center; background-color: #f7d1ba">13</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #f7d1ba">6</td>
                    <td style="text-align: center; background-color: #f7d1ba">Peach Juice</td>
                    <td style="text-align: center; background-color: #f7d1ba">15</td>
                  </tr>
                  <tr>
                    <td style="text-align: center; background-color: #f7d1ba">7</td>
                    <td style="text-align: center; background-color: #f7d1ba">
                      Chinese Braised Chicken Soup
                    </td>
                    <td style="text-align: center; background-color: #f7d1ba">18</td>
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
  margin-top: 10px;
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
