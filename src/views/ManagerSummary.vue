<script setup lang="ts">
</script>
<template>
    <v-container>
        <v-card>
            <v-card-text width="100vw" style="height: 90vh ;">
                <v-row class="text-center" cols="12">
                    <v-col class="title" md="4">
                        <v-container style="height: 100%">
                            <v-row class="profile" style="height: 25%;">
                                <v-col>
                                    <v-container>

                                        <v-avatar color="info" size="x-large">

                                        </v-avatar>
                                        <div class="text-subtitle-2 mt-3"></div>

                                    </v-container>

                                </v-col>
                            </v-row>
                            <v-row style="height: 30%">
                                <v-col>
                                    <v-col>
                                        <v-card-text style="text-align: left">
                                            <p>👤 Name : </p>
                                            <br />
                                            <p>📩 Email : </p>
                                            <br />
                                            <p>🗃️ Position : </p>
                                            <br />
                                            <p>🕐 hourly : ฿</p>
                                        </v-card-text>

                                    </v-col>

                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>

                    <v-col class="detail">
                        <v-container style="height: 100%; ">
                            <v-row style="height: 15%">
                                <v-card-text style="text-align: left; font-size:30px; font-family: Georgia, serif;">
                                    Summary Salary
                                </v-card-text>

                                <v-row class="text-center" style="height: 10%;">
                                    <v-col>
                                        <div class="stats shadow" style="background-color:white; box-shadow: rgba(0, 0, 0, 0.20) 0px 3px 5px;">
                                            <div class="stat">
                                                
                                                <div class="stat-value text-brown-lighten-1 " style="font-size: 29px; font-family: sans-serif; text">2023 / 04</div>
                                                <br/>
                                                <div class="stat-desc" style="font-size: 15px;">YYYY/MM </div>
                                            </div>
                                            <div class="stat">
                                                
                                                <div class="stat-value text-blue-grey-darken-2" style="font-size: 29px; font-family: sans-serif;">96.455 ฿</div>
                                                <br/>
                                                <div class="stat-desc">SALARY</div>
                                            </div>
                                            <div class="stat">
                                                
                                                <div class="stat-value text-red-darken-2" style="font-size: 29px; font-family: sans-serif;">2.6 M</div>
                                                <br/>
                                                <div class="stat-desc">Status Paid</div>
                                            </div>
                                            <div class="stat">
                                                <v-btn style="background-color: whitesmoke; " >Paid</v-btn> 
                                                
                                            </div>
                                        </div>
                                    </v-col>


                                </v-row>
                            </v-row>
                            <v-col class="detail">
                                <v-container style="height: 60%; ">

                                </v-container>

                            </v-col>




                        </v-container>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<style scoped>
.title {
    background-color: #FCF8E8;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px;
    height: 100vh;
}

.detail-emp {
    width: 100%;
    display: flex;
    justify-content: center;
}

.detail {
    width: 70 vw;
}
</style>

