<script setup lang="ts">
import { useCustomerStore } from '@/store/customer.store'
import { useMessageStore } from '@/store/message';
import { ref } from 'vue';
import PointDialog from './PointDialog.vue';
const customerTel = ref('');
const customerStore = useCustomerStore()
const customer = ref();
const messageStore = useMessageStore()
const close2Dialog = () => {
    customerStore.dialogCheckPoint = false;


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
    <PointDialog></PointDialog>
<v-dialog v-model="customerStore.dialogCheckPoint" persistent width="500px">
        <v-card class="scroll">
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

                                        <input type="search" id="default-search" v-model="customerTel"
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

                                            <v-btn size="70px" color="#A0937D" class="ml-15"
                                            style="float: right; font-size: 25px; color: white; " icon="mdi mdi-arrow-left"
                                            @click="findCus()"> Ok</v-btn>

                                    </v-col>

                                </div>

                            </v-row>
                        </v-row>


                    </v-container>

                </v-card-text>
            </v-container>


        </v-card>




    </v-dialog>
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