<script setup lang="ts">
import { useEmployeeStore } from '@/store/employee.store'
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
const employeeStore = useEmployeeStore()
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const email = ref('')
const name = ref('')
const login = async () => {
  const { valid } = await form.value!.validate()
  if (valid) {
    employeeStore.loginEmployee(email.value, name.value)
  }
}
const clear = () => {
  form.value?.reset();
}
</script>

<template>
  <v-app>
    <v-main class="bg-blue-grey pa-5">
      <v-card width="400px" class="mx-auto">
        <v-img
          src="https://i.pinimg.com/564x/e2/90/49/e290496e2521d29d3ac34af6e5d18c42.jpg"
          height="200px"
          cover
        ></v-img>
        <v-card-title primary-title class="text-center"> Login Employee</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="name"
              label="Login Name"
              :rules="[(v) => !!v || 'Email is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="email"
              type="text"
              :rules="[(v) => !!v || 'email is required']"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="login">Login</v-btn>
          <v-btn color="error" @click="clear">Clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>
