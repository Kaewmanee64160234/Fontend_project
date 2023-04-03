<script lang="ts" setup>
import { useMessageStore } from "@/store/message";

const messageStore = useMessageStore();
</script>
<template>
  <v-snackbar v-model="messageStore.isShow" multi-line color="black" rounded="pill" >
    <div style="text-align: center; font-size: 14px;"><v-icon  class="mr-5" > mdi-bell-alert</v-icon>  {{ messageStore.message }}</div>
   

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="messageStore.isShow = false">
        ยกเลิก
      </v-btn>
    </template>
  </v-snackbar>
</template>

