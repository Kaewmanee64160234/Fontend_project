<script setup lang="ts">
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const loginName = ref('')
const password = ref('')
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const login = async () => {
  const { valid } = await form.value!.validate()
  if (valid) {
    authStore.login(loginName.value, password.value)
  }
}
const reset = () => {
  form.value?.reset()
}

</script>

<template>
  <v-app>
    <v-main class="bg-img">
      <v-container class="pa-10" style="float: right;">
        <v-row style="float: right;">
          <v-col style="float: right;">
            <v-card width="550px" height="700px"
              style="border-radius: 50px; background-color: white; box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;">
              <v-card width="550px" height="700px"
                style="border-radius: 50px; background-color: white; box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;">
                <v-col>
                  <v-container class="text-center">
                    <img src="./Good_days_start_with_coffee_and_you.png" style="width: 320px; margin-left: 18%;"><img>
                    <v-card-title primary-title class="text-center "
                      style="font-size: 30px; font-family: serif;  font-weight: bold; letter-spacing: .2rem; margin-left: 3%;  ">
                      Sign in </v-card-title>
                  </v-container>

                </v-col>

                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-col>
                      <v-text-field v-model="loginName"  label="Login Name"  :rules="[
                        (v) => !!v || 'Email is required',
                        (v) =>
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email is not valid!!'
                      ]" required></v-text-field>

                    </v-col>

                    <v-col>
                      <v-text-field v-model="password" label="Password" type="password" :rules="[
                        (v) => !!v || 'Password is required',
                        (v) => v.length >= 8 || 'Password must be more than or equal 8 characters'
                      ]" required></v-text-field>

                    </v-col>

                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-col>
                    <v-btn color="white" style="background-color: #5D9C59; width:410px; height: 50px; margin-left: 10%; "
                      @click="login">Login</v-btn>

                  </v-col>

                </v-card-actions>

              </v-card>




            </v-card>


          </v-col>
        </v-row>



      </v-container>







    </v-main>
  </v-app>
</template>
<style>
.bg-img {
  /* The image used */
  background-image: url("Good days 4.png");
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.6px);
  -webkit-backdrop-filter: blur(5.6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}</style>
