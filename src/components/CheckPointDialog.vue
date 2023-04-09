<script setup lang="ts">
import { useCustomerStore } from '@/store/customer.store'
const customerStore = useCustomerStore()
const close2Dialog = () => {
    customerStore.dialogCheckPoint = false;


}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-dialog v-model="customerStore.dialogCheckPoint" persistent width="300px">
                    <v-container>

                        <v-card style="width: 26vw ; height: 70vh;  border-radius: 60px;" class="pa-10">
                            <v-row>
                                <v-card-title style="text-align: center; font-size: 21px; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">Please enter the phone number <br /> to check the points</v-card-title>
                            </v-row>
                            <v-row>
                                <v-text-field class="pa-6" label="Phone number" variant="solo"></v-text-field>

                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">1 </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">2 </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">3 </v-btn>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">4 </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">5 </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">6 </v-btn>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">7 </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px;border-radius: 60px">8 </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">9 </v-btn>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col>
                                    
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color: #665A48; color: white; font-size: 20px; border-radius: 60px">0 </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn style="background-color:#665A48; color: white; font-size: 15px;border-radius: 60px"><v-icon>mdi-arrow-left</v-icon></v-btn>
                                </v-col>

                            </v-row>
                            
                           
                           
                            
                            
                          

                        </v-card>

                    </v-container>







                </v-dialog>

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