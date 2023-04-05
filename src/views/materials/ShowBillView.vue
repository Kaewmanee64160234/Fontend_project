<script lang="ts" setup>
import { useBillStore } from '@/store/bill.store';
import { onMounted, ref } from 'vue';
const billStore = useBillStore();

onMounted(async () => {
    await billStore.getBills();
});
</script>
<template>
    <v-container>
        <v-card class="text-center mb-10" color="#F9F5E7" v-for="(item, index) of billStore.bill" :key="index" style="widows: 500;">
            <v-card-title>Bill</v-card-title>
            <v-card-text>{{ item.name }}</v-card-text>
            <v-card-text>{{ item.buy }}</v-card-text>
            <v-card-text>{{ item.change }}</v-card-text>
            <v-card-text>{{ item.total }}</v-card-text>
        </v-card>
    </v-container>
</template>


  <!-- <v-table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        <th>Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) of billStore.bill" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ new Date(item.date + '').getDate() + '/' + new Date(item.date + '').getMonth() + '/' + new Date(item.date + '').getFullYear() }}</td>
                            <td>{{ item.total }}</td>
                        </tr>
                    </tbody>
                    <tbody v-if="billStore.bill.length === 0">
                        <tr>
                            <td colspan="7" class="text-center">No data</td>
                        </tr>
                    </tbody>
                </v-table> -->
