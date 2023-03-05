<script setup lang="ts">

import { useAuthStore } from "@/store/auth";
import { ref } from "vue";
const drawer = ref(true);
const rail = ref(true);
const authStore = useAuthStore();
</script>

<template>

    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false"
      image="https://polycolors.ca/wp-content/uploads/2018/05/410604.jpg">
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="hello" nav>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-inbox-multiple " title="Product" value="product" to="/product"></v-list-item>
        
        <v-list-item prepend-icon="mdi-account" title="User" value="user" to="/user"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group-outline" title="Customer" value="customer"
        to="/customer"></v-list-item>
      <v-list-item prepend-icon="mdi-face-agent" title="Employee" value="employee"
      to="/employee"></v-list-item>
      <v-list-item prepend-icon="mdi-basket-outline" title="Material" value="material"
      to="/material"></v-list-item>
      <v-list-item prepend-icon="mdi-basket-outline" title="Store" value="store"
      to="/material"></v-list-item>
      <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout"
      @click="authStore.logout"></v-list-item>
      </v-list>
      
    </v-navigation-drawer>

</template>

