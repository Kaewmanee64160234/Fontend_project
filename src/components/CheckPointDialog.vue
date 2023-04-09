<script setup lang="ts">
<<<<<<< HEAD
import PointDialog from './PointDialog.vue'
import CheckPointDialog from '@/components/CheckPointDialog.vue'
import CheckPromotionDialog from '@/components/promotion/CheckPromotionDialog.vue'
import { useCustomerStore } from '@/store/customer.store'
import { usePointOfSale } from '@/store/pointOfSell.store'
import { useMessageStore } from '@/store/message'
// import Customer from '@/store/types/customer.type';
import { ref } from 'vue'
const customerStore = useCustomerStore()
const customerTel = ref('')
const customer = ref()
const messageStore = useMessageStore()

const pointOfSaleStore = usePointOfSale()
=======
import { useCustomerStore } from '@/store/customer.store'
import { ref } from 'vue';
const customerTel = ref('');
const customerStore = useCustomerStore()


>>>>>>> 50d212fb36ae1c8260b568bc0b6d37e90b6e13d3
const close2Dialog = () => {
  customerStore.dialogCheckPoint = false
}
const findCus = async () => {
  close2Dialog()
  
  const res = await customerStore.getCustomerByPhone(customerTel.value)
  customer.value = res
  if (!customer.value) {
    messageStore.showError('Not Found Customer')
    customerStore.dialogCheckPoint = false

    return false
  }
  console.log(customer.value)
  customerStore.dialogPoint = true;
}
</script>
<template>
<<<<<<< HEAD
<<<<<<< HEAD
    <PointDialog></PointDialog>
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <v-dialog v-model="customerStore.dialogCheckPoint" persistent width="39%">
            <v-card style="cursor: pointer; border-radius: 50px; padding: 15px">
              <v-row class="mr-3 mt-5">
                <v-col>
                  <v-btn
                    color="#A9907E"
                    class="mr-5"
                    icon="mdi mdi-close-thick"
                    style="float: right; color: white"
                    @click="customerStore.dialogCheckPoint = false"
                  ></v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-card-title
                    class="pa-2"
                    style="
                      text-align: center;
                      height: 80vh;
                      font-size: 22px;
                      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    "
                    >Please enter the phone number <br />
                    to check the points

                    <v-col class="pa-8">
                      <form>
                        <div class="relative">
                          <input
                            v-model="customerTel"
                            type="search"
                            id="default-search"
                            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-brown-500 dark:bg-brown-700 dark:border-gray-600 dark:placeholder-brown-400 dark:text-white dark:focus:ring-brown-500 dark:focus:border-brown-500"
                            placeholder="Phone number"
                            style="font-size: 18px; text-align: center"
                          />
                        </div>
                      </form>
                    </v-col>
                    <v-col>
                      <v-btn
                        @click="customerTel += '1'"
                        size="70px"
                        color="#614124"
                        class="ml-20"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-1"
                      ></v-btn>
                      <v-btn
                        @click="customerTel += '2'"
                        size="70px"
                        color="#614124"
                        class="ml-10"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-2"
                      ></v-btn>
                      <v-btn
                        @click="customerTel += '3'"
                        size="70px"
                        color="#614124"
                        class="ml-10"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-3"
                      ></v-btn>
                    </v-col>

                    <v-col style="margin-top: 13%">
                      <v-btn
                        @click="customerTel += '4'"
                        size="70px"
                        color="#614124"
                        class="ml-20"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-4"
                      ></v-btn>
                      <v-btn
                        @click="customerTel += '5'"
                        size="70px"
                        color="#614124"
                        class="ml-10"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-5"
                      ></v-btn>
                      <v-btn
                        @click="customerTel += '6'"
                        size="70px"
                        color="#614124"
                        class="ml-10"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-6"
                      ></v-btn>
                    </v-col>

                    <v-col style="margin-top: 13%">
                      <v-btn
                        @click="customerTel += '7'"
                        size="70px"
                        color="#614124"
                        class="ml-20"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-7"
                      ></v-btn>
                      <v-btn
                        @click="customerTel += '8'"
                        size="70px"
                        color="#614124"
                        class="ml-10"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-8"
                      ></v-btn>
                      <v-btn
                        @click="customerTel += '9'"
                        size="70px"
                        color="#614124"
                        class="ml-10"
                        style="float: left; font-size: 30px; color: white"
                        icon="mdi mdi-numeric-9"
                      ></v-btn>
                    </v-col>
                    <v-col style="margin-top: 13%">
                      <div style="margin-right: 18%">
                        <v-btn
                          @click="customerTel = customerTel.slice(0, -1)"
                          size="70px"
                          color="#614124"
                          class="ml-10"
                          style="float: right; font-size: 25px; color: white"
                          icon="mdi mdi-arrow-left"
                        ></v-btn>
                        <v-btn
                          @click="customerTel += '0'"
                          size="70px"
                          color="#614124"
                          class="ml-10"
                          style="float: right; font-size: 30px; color: white"
                          icon="mdi mdi-numeric-0"
                        ></v-btn>
                      </div>
                    </v-col>
                    <v-col style="margin-top: 15%">
                      <div style="margin-left: 8%">
                        <v-btn
                          color="#A0937D"
                          style="
                            float: left;
                            border-radius: 30px;
                            width: 35%;
                            color: white;
                            font-size: 19px;
                          "
                          @click="customerTel = ''"
                          >Clear</v-btn
                        >
                      </div>
                      <div style="margin-right: 8%">
                        <v-btn
                          color="#A0937D"
                          style="
                            float: right;
                            border-radius: 30px;
                            width: 35%;
                            color: white;
                            font-size: 19px;
                          "
                          @click="findCus(),customerStore.dialogPoint = true"
                          >Ok</v-btn
                        >
                      </div>
                    </v-col>
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
=======
    <v-dialog v-model="customerStore.dialogCheckPoint" persistent width="39%">
        <v-card style="cursor: pointer; border-radius: 50px; padding: 15px;">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon="icon" color="brown"  @click="customerStore.dialogCheckPoint = false">X</v-btn>
            </v-card-actions>
=======
<v-dialog v-model="customerStore.dialogCheckPoint" persistent width="500px">
        <v-card class="scroll">
>>>>>>> c147200f338bd19c1822d13e16300ee7f8f4bb28
            <v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon="icon" color="brown" @click="customerStore.dialogCheckPoint = false">X</v-btn>
                </v-card-actions>
                <v-card-text>
                    <v-container style="text-align: center;">
                        <h1 style="font-size: 20px;">Please
                            enter the phone number <br /> to check the points</h1>
                    </v-container>
                    <v-container>
                        <v-row class="card-promo">
                            <v-row>
                                <v-col>
                                    <div class="relative">

                                        <input type="search" id="default-search"
                                            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-brown-500 dark:bg-brown-700 dark:border-gray-600 dark:placeholder-brown-400 dark:text-white dark:focus:ring-brown-500 dark:focus:border-brown-500"
                                            placeholder="Phone number" style="font-size: 18px; text-align: center; ">

                                    </div>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-1"
                                        @click="customerTel += '1'"></v-btn>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-2"
                                        @click="customerTel += '2'"></v-btn>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-3"
                                        @click="customerTel += '3'"></v-btn>
                                </v-col>

                            </v-row>
                            <v-row>

                                <v-col>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-4"
                                        @click="customerTel += '4'"></v-btn>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-5"
                                        @click="customerTel += '5'"></v-btn>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-6"
                                        @click="customerTel += '6'"></v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-7"
                                        @click="customerTel += '7'"></v-btn>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-8"
                                        @click="customerTel += '8'"></v-btn>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-9"
                                        @click="customerTel += '9'"></v-btn>
                                </v-col>

                            </v-row>
                            <v-row>
                                <div>
                                    <v-col>
                                        <v-btn size="70px" color="#614124" class="ml-15"
                                            style="float: right; font-size: 25px; color: white; " icon="mdi mdi-arrow-left"
                                            @click="customerTel = customerTel.slice(0, -1)"></v-btn>

                                        <v-btn size="70px" color="#614124" class="ml-15"
                                            style="float: right; font-size: 30px; color: white;" icon="mdi mdi-numeric-0"
                                            @click="customerTel += '0'"></v-btn>

                                    </v-col>

                                </div>

                            </v-row>
                            <v-row>
                                <v-col>
                                    <div style="margin-top: 10%; margin-right: 33%;">
                                        <v-btn color="#A0937D"
                                            style="float: right; border-radius: 30px; width: 70%; color: white; font-size: 19px;"
                                            @click="customerStore.dialogPoint = true"> Ok</v-btn>
                                    </div>

                                </v-col>

                            </v-row>


                        </v-row>


                    </v-container>

                </v-card-text>
            </v-container>


        </v-card>




    </v-dialog>
>>>>>>> 50d212fb36ae1c8260b568bc0b6d37e90b6e13d3
</template>
<style>
.button {
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%;
}
.scroll {
    overflow: scroll;
}

.scroll::-webkit-scrollbar {
    width: 5px;
    height: 4px;
}

.scroll::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 999px;
}
</style>

<<<<<<< HEAD

=======
                        
>>>>>>> 50d212fb36ae1c8260b568bc0b6d37e90b6e13d3
