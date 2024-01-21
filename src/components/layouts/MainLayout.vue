<template>
  <v-layout>
    <RouterView name="header"></RouterView>
    <RouterView name="menu"></RouterView>

    <v-main class="white"><RouterView></RouterView></v-main>
  </v-layout>
</template>
