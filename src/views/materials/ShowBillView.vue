
<script setup lang="ts">
import { useBillStore } from '@/store/bill.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const billStore = useBillStore();

const route = useRoute()
const id = route.params.id
onMounted(() => {
  billStore.getBills()

})

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

    