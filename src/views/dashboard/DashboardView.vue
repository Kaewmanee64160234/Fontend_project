
<script lang="ts" setup>
import BoarddayDialog from "../../components/dashboards/BoardmonthDialog.vue"
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        Dashbords
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="4" md="5">
            <BoarddayDialog></BoarddayDialog>
          </v-col>
          <v-col cols="12" sm="4" md="5">
            <BoarddayDialog></BoarddayDialog>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="5">
            สินค้าขายดี
          </v-col>
          <v-col cols="12" sm="4" md="5">
            สินค้ายอดขายน้อย
          </v-col>
          <v-col cols="12" sm="4" md="5">
            <v-table>
              <thead style="text-align: center">สินค้าใกล้หมดสต็อก
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
          </v-col>
        </v-row>
       
        
        </v-card>
        </v-container>
</template>