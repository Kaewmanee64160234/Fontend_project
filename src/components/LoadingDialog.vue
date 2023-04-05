<script lang="ts" setup>
import { useLoadingStore } from "@/store/loading";
import { ref } from "vue";



const loadingStore = useLoadingStore();
</script>

<template>
    <VDialog v-model="loadingStore.isLoading" persistent width="auto">
        <VProgressCircular
          :rotate="360"
          :size="50"
          class="mt-2"
          color="#4E6C50"
          indeterminate
        ></VProgressCircular>
</VDialog>
</template>