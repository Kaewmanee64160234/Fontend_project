<script lang="ts" setup>
import { useLoadingStore } from "@/store/loading";
import { ref } from "vue";
const value = ref("ติดไว้ก่อน");

const loadingStore = useLoadingStore();
</script>

<template>
    <v-dialog v-model="loadingStore.isLoading" persistent width="auto">
        <v-card>
      <v-card-text class="text-center">
        <div>Please wait</div>
        <v-progress-circular
          :rotate="360"
          :size="50"
          :model-value="value"
          class="mt-2"
          color="#93BFCF"
          indeterminate
        >{{ value }}</v-progress-circular>
      </v-card-text>
    </v-card>
</v-dialog>
</template>