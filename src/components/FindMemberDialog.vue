<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCustomerStore } from '@/store/customer.store';
const customerStore = useCustomerStore();

onMounted(() => {
  customerStore.getCustomers()
})


</script>
<template>
    <v-dialog persistent v-model="customerStore.dialog" width="50%">
      <v-card height="500px">
        <v-card-title>
          Find Member
        </v-card-title>
        <v-card-text>
        <v-text-field 
        label="Phone Number" 
        height="20px" 
        hide-details="auto"   
        :loading="customerStore.loading"
        density="compact"
        variant="solo"
        v-model="customerStore.keyword"
        append-inner-icon="mdi-magnify"
        @click:append-inner="customerStore.getCustomerByTel"></v-text-field>
           <v-card class="mx-auto" style="margin-top: 10px;">
            <div style="height: 45vh;" class="scroll ">
            <v-list class="scroll" lines="two" v-if="customerStore.customers.length > 0">
              <v-list-item v-for="item in customerStore.customers" :value="item.id" :key="item.id" prepend-icon="mdi-account-star"
              :title="item.name" :subtitle="item.point + ` Point`" style="font-size: 15px" :type="item.name">
              <template v-slot:append>
              <v-btn variant="tonal"
                    color="teal-darken-1"
                    @click="customerStore.addPointCustomer(item.id+''),customerStore.dialog = false">Add  Point</v-btn>
              </template>
            </v-list-item>
            </v-list>
            </div>
           </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="customerStore.dialog = false">Close
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style>
.scroll {
  max-height: 90vh;
  overflow: scroll;
}

.scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 999px;
}
</style>