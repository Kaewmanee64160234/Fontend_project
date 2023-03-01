<script lang="ts" setup>
import { useLoadingStore } from "@/store/loading";

const loadingStore = useLoadingStore();
</script>

<template>
    <v-dialog v-model="loadingStore.isLoading" persistent width="auto">
        <v-card>
      <v-card-text class="text-center">
        <div>Please wait</div>
        <v-progress-circular
          :size="50"
          class="mt-2"
          color="#93BFCF"
          indeterminate
        ></v-progress-circular>
      </v-card-text>
    </v-card>
</v-dialog>
</template>