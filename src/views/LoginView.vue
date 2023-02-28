<script setup lang="ts">
import { ref } from 'vue';
const loginName = ref("");
const password = ref("");
</script>

<template>
  <v-app>
    <v-main class="bg-blue-grey pa-5" >
      <v-card width="400px" class="mx-auto">
        <v-card-title
          primary-title
          class="max-auto"
        >
          Login
        </v-card-title>
        <v-card-text>
            <v-form >
                <v-text-field
                  v-model="loginName"
                  label="Login Name"
                  :rules="[
                (v) => !!v || 'Email is required',
                (v) =>
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  'Email is not valid!!',
              ]"
              required
                ></v-text-field>
                <v-text-field
                v-model="password"
                  label="Password" type="password"
                  :rules="[
                (v) => !!v || 'Password is required',
                (v) =>
                  v.length >= 8 ||
                  'Password must be more than or equal 8 characters',
              ]"
              required
                ></v-text-field>
              </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="success" >Login</v-btn>
          <v-btn color="error" >Clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>
