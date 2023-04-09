<script setup lang="ts">
import { useCustomerStore } from '@/store/customer.store'
import { useMessageStore } from '@/store/message';
// import Customer from '@/store/types/customer.type';
import { ref } from 'vue'
const customerStore = useCustomerStore()
const customerTel = ref('')
const customer = ref()
const messageStore = useMessageStore()
const close2Dialog = () => {
  customerStore.dialogCheckPoint = false
}
const findCus = async () => {
  close2Dialog
  const res = await customerStore.getCustomerByPhone(customerTel.value)
  customer.value = res
  if(!customer.value){
    messageStore.showError('Not Found Customer')
  customerStore.dialogCheckPoint = false

    return false;
  }
  console.log(customer.value)
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <v-dialog
            v-model="customerStore.dialogCheckPoint"
            persistent
            width="500px"
            style="background-color: #ad8e70"
          >
            <v-card style="border-radius: 8%; width: 35vw">
              <v-row class="mr-3 mt-5">
                <v-col>
                  <v-btn
                    color="#A9907E"
                    class="mr-5"
                    icon="mdi mdi-close-thick"
                    style="float: right"
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
                          >Skip</v-btn
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
                          @click="findCus()"
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
</style>
<!-- <v-card style="width: 26vw ; height: 70vh;  border-radius: 60px;" >
                           

                        </v-card> -->
