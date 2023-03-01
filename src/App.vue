<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import LoadingDialog from './components/LoadingDialog.vue';
</script>

<template>
  <component :is="MainLayout"></component>

  <!-- <main>
    <RouterView></RouterView>
  </main> -->
  
  <LoadingDialog></LoadingDialog>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
* {
  font-family: 'Kanit', sans-serif;
}
</style>
