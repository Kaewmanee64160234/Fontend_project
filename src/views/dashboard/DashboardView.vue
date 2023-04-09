<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import ChartComponentDialog from '../../components/dashboards/ChartComponentDialog.vue'
import DonutDialog from '@/components/dashboards/DonutDialog.vue'
import { useProductStore } from '@/store/product.store'
const productStore = useProductStore()
onMounted(() => {
  productStore.take = 41
  productStore.getProducts()
})
const mounth = [
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
]
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const qu = ['1', '2', '3', '4']
const data = ref()
const time = ref('')
watch(time, (newTime, oldTime) => {
  if (time.value === 'month') {
    data.value = mounth
  }
  if (time.value === 'dayOfWeek') {
    data.value = dayOfWeek
  }
  if (time.value === 'qu') {
    data.value = qu
  }
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
    {{ data }}
    <div class="page">
      <v-card-title class="text-center">
        <a class="font">Dashboards</a>
      </v-card-title>
      <v-row>
        <v-col cols="6" md="8">
          <v-container>
            <v-card class="text-center" width="900px" style="font-size: 140%">
              Daily Sales
              <ChartComponentDialog
                type="line"
                
                :color="`#62CDFF`"
                :dataValues="[30, 55, 25, 45, 50, 40, 32]"
                :dataLabels="data"
                 :label="time"
             
              >
              </ChartComponentDialog>
            </v-card>
          </v-container>
        </v-col>
        <v-col style="margin-top: 10px">
          <select
            label="Select"
            v-model="time"
            style="width: 200px"
            class="bg-gray-50 text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white"
          >
            <option selected>Select</option>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="qu">Month</option>
            <option value="dayOfWeek">day of week</option>
            <option value="day">Day</option>
          </select>
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
            <v-card width="400px" max-height="424px" class="text-center">
              The product is almost out of stock
              <v-table style="margin-bottom: 2">
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
                    <td style="text-align: center">Cookie</td>
                    <td style="text-align: center">4</td>
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
              <v-table style="margin-bottom: 2">
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
                    <td style="text-align: center">Cookie</td>
                    <td style="text-align: center">4</td>
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
