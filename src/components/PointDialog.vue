<script setup lang="ts">
import { useCustomerStore } from '@/store/customer.store'
const customerStore = useCustomerStore()
const close2Dialog = () => {
    customerStore.dialogCheckPoint = false;

}
</script>
<template>
    
    <v-dialog v-model="customerStore.dialogCheckPoint" persistent width="39%">
        <v-card style="cursor: pointer; border-radius: 50px; padding: 15px;">
            <v-row class="mr-3 mt-5">
                <v-col>
                    <v-btn color="#A9907E" class="mr-5" icon="mdi mdi-close-thick" style="float: right; color: white;"  @click="customerStore.dialogCheckPoint = false"></v-btn>
                </v-col>
            </v-row>

            <v-container>
                <v-row>
                    <v-col>
                        <v-card-title class="pa-2"
                            style="text-align: center; max-height: 800px; font-size: 22px;">Please
                            enter the phone number <br /> to check the points

                            <v-col class="pa-8">
                                <form>

                                    <div class="relative">

                                        <input type="search" id="default-search"
                                            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-brown-500 dark:bg-brown-700 dark:border-gray-600 dark:placeholder-brown-400 dark:text-white dark:focus:ring-brown-500 dark:focus:border-brown-500"
                                            placeholder="Phone number" style="font-size: 18px; text-align: center; ">

                                    </div>
                                </form>

                            </v-col>
                            <v-col>
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-1"></v-btn>
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-2"></v-btn>
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-3"></v-btn>
                            </v-col>

                            <v-col style="margin-top: 13%;">
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-4"></v-btn>
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-5"></v-btn>
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-6"></v-btn>
                            </v-col>

                            <v-col style="margin-top: 13%;">
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-7"></v-btn>
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-8"></v-btn>
                                <v-btn size="70px" color="#614124" class="ml-15"
                                    style="float: left; font-size: 30px; color: white;" icon="mdi mdi-numeric-9"></v-btn>
                            </v-col>
                            <v-col style="margin-top: 13%;">
                                <div style="margin-right: 12%;">
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: right; font-size: 25px; color: white;"
                                        icon="mdi mdi-arrow-left"></v-btn>
                                    <v-btn size="70px" color="#614124" class="ml-15"
                                        style="float: right; font-size: 30px; color: white;"
                                        icon="mdi mdi-numeric-0"></v-btn>

                                </div>
                            </v-col>

                        </v-card-title>


                    </v-col>
                </v-row>

            </v-container>





        </v-card>




    </v-dialog>
</template>