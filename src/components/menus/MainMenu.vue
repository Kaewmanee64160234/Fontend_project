<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { onMounted, ref, watch } from 'vue'
const drawer = ref(true)
const rail = ref(true)
const authStore = useAuthStore()

const user = ref<any | null>(localStorage.getItem('user'))
const user_ = JSON.parse(user.value)
const employee = ref<any | null>(localStorage.getItem('employee'))
const employee_ = JSON.parse(employee.value)
const url = import.meta.env.VITE_URL_PORT
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    image="https://polycolors.ca/wp-content/uploads/2018/05/410604.jpg"
  >
    <v-list-item :prepend-avatar="`${url}/employees/image/${employee_.image}`" :title="user_.username + ` (${user_.role})`" class="mt-2" nav>
    
     
      <p class="text-caption">{{ user_.login }}  </p>
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi mdi-chart-line"
        title="Dashboard"
        value="dashboard"
        to="/"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-network-pos" title="Point of sell" value="home" to="/home"></v-list-item>
      <v-list-item
        prepend-icon="mdi-inbox-multiple "
        title="Product"
        value="product"
        to="/product"
      ></v-list-item>

      <v-list-item v-if="user_.role !=='employee'"  
        prepend-icon="mdi-account" 
        title="User" 
        value="user" 
        to="/user">
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="Customer"
        value="customer"
        to="/customer"
      ></v-list-item>

      <v-list-item 
        prepend-icon="mdi-face-agent"
        title="Employee"
        value="employee"
        to="/employee"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-basket-outline"
        title="Material"
        value="material"
        to="/material"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-store-marker"
        title="Store"
        value="store"
        to="/store"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-store-marker"
        title="Topping"
        value="topping"
        to="/topping"
      ></v-list-item>
      <v-list-item 
        prepend-icon="mdi-account-group-outline"
        title="Checkin-Checkout"
        value="Login employee"
        to="/employee/login"
      ></v-list-item>
      <v-list-item v-if="user_.role !=='employee'" 
        prepend-icon="mdi-account-tie"
        title="Manager"
        value="Login Manager"
        to="/manager/employees"
      ></v-list-item>

      <v-list-item v-if="user_.role !=='employee'"   prepend-icon="mdi-book " title="Order" value="Order" to="/orders"></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout-variant"
        title="Logout"
        value="logout"
        @click="authStore.logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
