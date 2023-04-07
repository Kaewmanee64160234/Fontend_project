<script lang="ts" setup>
import { useManageTime } from '@/store/manageDate';
import { useOrderStore } from '@/store/order.store'
import { usePointOfSale } from '@/store/pointOfSell.store'
const manageTimeStore = useManageTime()
const pointOfSaleStore = usePointOfSale()
const orderStore = useOrderStore()
const date = (index: string) => {

  let dd = new Date(index)
  let date = { date: '', mouth: '', year: '', hour: '', minute: '', second: '' }
  date.year = dd.getFullYear() + ''
  date.date = dd.getDate() + ''
  date.mouth = dd.getMonth() + ''
  date.minute = '' + dd.getMinutes()
  date.hour = '' + dd.getHours()
  date.second = '' + dd.getSeconds()
  if (dd.getDate() < 10) {
    date.date = '0' + dd.getDate()

  }
  if (dd.getMonth() < 10) {
    date.mouth = '0' + dd.getMonth()
  }
  if (dd.getHours() < 10) {
    date.hour = '0' + dd.getHours()
  }
  if (dd.getMinutes() < 10) {
    date.minute = '0' + dd.getHours()
  }
  if (dd.getSeconds() < 10) {
    date.second = dd.getSeconds() + '0'



  } if (dd.getMonth() < 10) {
    date.mouth = '0' + dd.getMonth()
  }
  if (dd.getHours() < 10) {
    date.hour = '0' + dd.getHours()
  }
  if (dd.getMinutes() < 10) {
    date.minute = '0' + dd.getHours()
  }
  if (dd.getSeconds() < 10) {
    date.second = dd.getSeconds() + '0'
  }
  return date;

}
</script>
<template>
  <v-dialog width="auto" height="auto" v-model="pointOfSaleStore.dialogComplteOrder">
    <v-card>
      <v-card-title>
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
                                  <h2  style="font-size: 20px; font-family: Georgia, serif; ">☕ Thanks You ☕</h2>
                                </td>
                              </tr>
                              <tr>
                                <td class="content-block">
                                  <table class="invoice">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <!-- customer: {{ orderStore.tempOrder.customer?.id! }}<br /> -->
                                          OrderId: {{ orderStore.tempOrder.id }} | {{
                                            date(orderStore.tempOrder.createdDate + '').date +
                                            '-' +
                                            manageTimeStore.monthNum[new Date(orderStore.tempOrder.createdDate +
                                              '').getMonth()] +
                                            '-' +
                                            new Date(orderStore.tempOrder.createdDate + '').getFullYear() +
                                            ' | ' +
                                            new Date(orderStore.tempOrder.createdDate + '').getHours() +
                                            ':' +
                                            new Date(orderStore.tempOrder.createdDate + '').getMinutes() +
                                            ':' +
                                            new Date(orderStore.tempOrder.createdDate + '').getSeconds()
                                          }}<br /> Date : {{
                                            date(orderStore.tempOrder.createdDate + '').date +
                                            '-' +
                                            manageTimeStore.monthNum[new Date(orderStore.tempOrder.createdDate +
                                              '').getMonth()] +
                                            '-' +
                                            new Date(orderStore.tempOrder.createdDate + '').getFullYear() +
                                            ' | ' +
                                            new Date(orderStore.tempOrder.createdDate + '').getHours() +
                                            ':' +
                                            new Date(orderStore.tempOrder.createdDate + '').getMinutes() +
                                            ':' +
                                            new Date(orderStore.tempOrder.createdDate + '').getSeconds()
                                          }}<br />
                                          Payment : {{ orderStore.tempOrder.payment }}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>
                                          <table class="invoice-items" cellpadding="0" cellspacing="0">
                                            <tbody>
                                              <tr v-for="item in orderStore.tempOrder.orderItems" :key="item.name">
                                                <td>{{ item.name }}</td>
                                                <td class="alignright">{{ item.total }} ฿</td>
                                              </tr>
                                              <tr class="finishOrder">
                                                <td>Discount</td>
                                                <td class="alignright">
                                                  {{ orderStore.tempOrder.discount }} ฿
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Recieve</td>
                                                <td class="alignright">
                                                  {{ orderStore.tempOrder.recieved }} ฿
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Change</td>
                                                <td class="alignright">
                                                  {{ orderStore.tempOrder.change }} ฿
                                                </td>
                                              </tr>

                                              <tr class="total">
                                                <td class="alignright" width="80%">Total</td>
                                                <td class="alignright">
                                                  {{ orderStore.tempOrder.total }} ฿
                                                </td>
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
                                <td class="content-block">
                                  All For One Company Inc. Buu section 2 .
                                </td>
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
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn color="green" variant="text">Print</v-btn>
        <v-btn color="red" variant="text" @click="pointOfSaleStore.dialogComplteOrder = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  font-size: 14px;
}

img {
  max-width: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: none;
  width: 100% !important;
  height: 100%;
  line-height: 1.6;
}

/* Let's make sure all tables have defaults */
table td {
  vertical-align: top;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
body {
  background-color: #ffffff;
}

.body-wrap {
  width: 40vw;
  /* background-color: #eee; */
  display: flex;
  justify-content: center;
}

.container {
  display: block !important;
  max-width: 600px !important;
  margin: 0 auto !important;
  /* makes it centered */
  clear: both !important;
}

.content {
  max-width: 600px;
  margin: 0 auto;
  display: block;
  padding: 20px;
}

/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
  background: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
}

.content-wrap {
  padding: 20px;
}

.content-block {
  padding: 0 0 20px;
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

/* -------------------------------------
    TYPOGRAPHY
------------------------------------- */
h1,
h2,
h3 {
  font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  color: #000;
  margin: 40px 0 0;
  line-height: 1.2;
  font-weight: 400;
}

h1 {
  font-size: 32px;
  font-weight: 500;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 14px;
  font-weight: 600;
}

p,
ul,
ol {
  margin-bottom: 10px;
  font-weight: normal;
}

p li,
ul li,
ol li {
  margin-left: 5px;
  list-style-position: inside;
}

/* -------------------------------------
    LINKS & BUTTONS
------------------------------------- */
a {
  color: #1ab394;
  text-decoration: underline;
}

.btn-primary {
  text-decoration: none;
  color: #fff;
  background-color: #1ab394;
  border: solid #1ab394;
  border-width: 5px 10px;
  line-height: 2;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  text-transform: capitalize;
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
  margin-bottom: 0;
}

.first {
  margin-top: 0;
}

.aligncenter {
  text-align: center;
}

.alignright {
  text-align: right;
}

.alignleft {
  text-align: left;
}

.clear {
  clear: both;
}

/* -------------------------------------
    ALERTS
    Change the class depending on warning email, good email or bad email
------------------------------------- */
.alert {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  padding: 20px;
  text-align: center;
  border-radius: 3px 3px 0 0;
}

.alert a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
}

.alert.alert-warning {
  background: #f8ac59;
}

.alert.alert-bad {
  background: #ed5565;
}

.alert.alert-good {
  background: #1ab394;
}

/* -------------------------------------
    INVOICE
    Styles for the billing table
------------------------------------- */
.invoice {
  margin: 40px auto;
  text-align: left;
  width: 80%;
}

.invoice td {
  padding: 5px 0;
}

.invoice .invoice-items {
  width: 100%;
}

.invoice .invoice-items td {
  border-top: #eee 1px solid;
}

.invoice .invoice-items .total td {
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  font-weight: 700;
}

.finishOrder {
  border-top: 2px solid #333;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 640px) {

  h1,
  h2,
  h3,
  h4 {
    font-weight: 600 !important;
    margin: 20px 0 5px !important;
  }

  h1 {
    font-size: 22px !important;
  }

  h2 {
    font-size: 18px !important;
  }

  h3 {
    font-size: 16px !important;
  }

  .container {
    width: 100% !important;
  }

  .content,
  .content-wrap {
    padding: 10px !important;
  }

  .invoice {
    width: 100% !important;
  }
}
</style>
