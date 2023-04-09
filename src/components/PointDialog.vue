<script setup lang="ts">
import { useCustomerStore } from '@/store/customer.store'
const customerStore = useCustomerStore()
const close2Dialog = () => {
    customerStore.dialogCheckPoint = false;

}
</script>
<template>
    
    <v-dialog v-model="customerStore.dialogPoint" persistent width="39%" height="45vh">
        <v-card style="cursor: pointer; border-radius: 50px; padding: 15px; ">
            <v-row class="mr-3 mt-5">
                <v-col>
                    <v-btn color="#A9907E" class="mr-5" icon="mdi mdi-close-thick" style="float: right; color: white;"  @click="customerStore.dialogPoint = false"></v-btn>
                </v-col>
            </v-row>

            <v-container>
                <v-row>
                    <v-col>
                        <v-card-title class="pa-2" 
                            style="text-align: center; max-height: 800px; font-size: 22px;">แต้มของคุณ <span style="font-weight: bold;">{{ customerStore.customer?.name }}</span><br /> 

                            <v-col class="pa-8">
                                <form>

                                    <div class="relative">

                                        <v-card  variant="outlined" height="100px">
                                            <v-card-title justify="center">
                                                <h1 style="padding: 18px; font-size: 40px;font-weight: bold;color: darksalmon;">{{ customerStore.customer?.point }}</h1>
                                            </v-card-title>

                                        </v-card>

                                    </div>
                                </form>

                            </v-col>
                            

                        </v-card-title>


                    </v-col>
                </v-row>

            </v-container>





        </v-card>




    </v-dialog>
</template>