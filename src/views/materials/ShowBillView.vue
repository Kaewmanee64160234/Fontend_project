<script setup lang="ts">import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);
</script>
<template>
    <div>Check Material ID: {{ id }}</div>
    <v-container>
        <v-card>
            <v-card-title> BILL
            </v-card-title>
        </v-card>
    </v-container>
</template>