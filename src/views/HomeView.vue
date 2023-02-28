<script setup lang="ts">
import MainMenu from '@/components/menus/MainMenu.vue';
import CustomerView from './customer/CustomerView.vue';
import LoginView from './LoginView.vue';
import { ref } from 'vue';
const drawer = ref(true);
const rail = ref(true);
</script>

<template>
  <v-layout>
    <v-app-bar image="https://i.pinimg.com/564x/34/8b/80/348b80a9c71040eee6d5df0c60f8b3f8.jpg">
      <v-app-bar-title icon="mdi-star-box-multiple-outline" class="font-weight-bold">MainHeader</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false"
      image="https://polycolors.ca/wp-content/uploads/2018/05/410604.jpg">
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Product" value="product" to="/product"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Product Full Screen" value="product_full"
          to="/product/full"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group-outline" title="User" value="user" to="/user"></v-list-item>
      </v-list>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Customer" value="customer"
        to="/customer"></v-list-item>
    </v-navigation-drawer>
  </v-layout>

  <main>
    <v-container>
    <CustomerView></CustomerView>
    </v-container>
  </main>
</template>
