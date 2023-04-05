<script lang="ts" setup>
import bill from '@/services/bill';
import { useBillStore } from '@/store/bill.store';
import { onMounted } from 'vue';
const billStore = useBillStore();

onMounted(async () => {
    await billStore.getBills();
});
</script>
<template>
    <v-container>
        <v-card>
            <v-card-title>
                Show Bill
            </v-card-title>
            <v-card class="text-center">
                <v-table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        <th>Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- {{ billStore.bill_list }} -->
                        <tr v-for="(item, index) of billStore.bill" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <!-- <td>{{ item.id }}</td> 
                        <td>{{ item.name }}</td> -->
                            <td>{{ new Date(item.date + '').getDate() + '/' + new Date(item.date + '').getMonth() + '/' + new
                                Date(item.date + '').getFullYear() }}</td>
                            <td>{{ item.total }}</td>

                        </tr>
                    </tbody>
                    <tbody v-if="billStore.bill_Detail_List.length == 0">
                        <tr>
                            <td colspan="7" class="text-center">No data</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-card>
    </v-container>
</template>