<script setup lang="ts"></script>
<template>
  <v-layout background-color="#ECCCB2">
    <RouterView name="header"></RouterView>
    <RouterView name="menu"></RouterView>

    <v-main><RouterView></RouterView></v-main>
  </v-layout>
</template>
