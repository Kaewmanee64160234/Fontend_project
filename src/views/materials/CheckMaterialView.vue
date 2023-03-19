<script setup lang="ts">
import { useBillStore } from '@/store/bill.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const billStore = useBillStore();

onMounted(() => {
  billStore.getBills()
})

const route = useRoute();
const id = ref(route.params.id);
</script>
<template>
    <div>Check Material {{ id }}</div>
    <v-container>
        <v-card>
            <v-card-title> BIll
               <v-table>
                <v-row>
                    <v-col>
                    </v-col>
                </v-row>
               </v-table>
            </v-card-title>
        </v-card>
    </v-container>
</template>