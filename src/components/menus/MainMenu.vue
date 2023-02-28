<script setup lang="ts">
import { ref } from "vue";
const drawer = ref(true);
const rail = ref(true);
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    image="https://i.pinimg.com/564x/09/9f/9b/099f9b33dea19ceb4fe16625578f6efb.jpg"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home-city"
        title="Home"
        value="home"
        to="/"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Product"
        value="product"
        to="/product"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Product Full Screen"
        value="product_full"
        to="/product/full"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="User"
        value="user"
        to="/user"
      ></v-list-item>
      <v-list-item
      prepend-icon="mdi-account-group-outline"
      title="Customer"
      value="customer"
      to="/customer"
    ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
