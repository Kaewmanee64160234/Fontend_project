<script setup lang="ts">
import { useBillStore } from '@/store/bill.store';
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
import type Employee from '@/store/types/employee.type';
import billdetail from '@/services/billdetail';
const billStore = useBillStore();
const form = ref<VForm | null>(null)
const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
const employee = ref<Employee>(JSON.parse(data.value))

async function save() {
  const { valid } = await form.value!.validate()
  if (valid) {
  billStore.bill_list.employeeId = employee.value.id;
  billStore.sumBill();
  await billStore.saveBill();
  reCode()
  billStore.dialog = false
  }
}

const reCode = () => {
  billStore.bill_list.name = '';
  billStore.bill_list.buy = 0;
  billStore.bill_list.bill_detail = [{ id:0,name: '', amount: 0, price: 0, total:0, materialId:0, billId:0}];
}

</script>
<template>
  <v-dialog persistent width="1024" v-model="billStore.dialog">
    <v-card>
      <v-card-title>
        <span class="text-h5">Bill</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="2"
                md="3"
              >
                <v-text-field
                  label="Name*"
                  class="mr-10"
                  required
                  variant="underlined"
                  v-model="billStore.bill_list.name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                  ]"
                ></v-text-field>
                </v-col>
              <v-col
                cols="12"
                sm="2"
                md="3"
              >
                <v-text-field
                  label="Buy*"
                  class="mr-10"
                  variant="underlined"
                  required
                  v-model.number="billStore.bill_list.buy"
                  :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']"
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
                sm="2"
                md="3"
              >
                <v-text-field
                  label="Change*"
                  class="mr-10"
                  variant="underlined"
                  required
                  v-model.number="billStore.bill_list.change"
                  :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']"
                ></v-text-field>
              </v-col> -->
                </v-row>
                </v-container>
            </v-form>
      </v-card-text>
      <v-card-text style="overflow-y: auto;">
        <v-form ref="form">
          <v-container width="80%">
            <v-card class="pa-5 ma-2 dialog1;justify-center" v-for="(item, index) in billStore.bill_list.bill_detail" :key="index" >
              <v-card-title style="text-align: center;">
                <p>Bill detail {{ index + 1 }}</p>
              </v-card-title>
              <v-card hidden>{{ item.id }}</v-card>
              <v-text-field v-model="item.name" label="Name" 
              :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                  ]">
              </v-text-field>
              <v-text-field v-model="item.price" label="price"
              :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']"
              ></v-text-field>
              <v-text-field v-model="item.amount" label="amount"
              :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']"
              ></v-text-field>
              <v-card class="hidden">{{ item.total = item.amount*item.price }}</v-card>
              <v-card-actions class="justify-center">
                <v-btn color="error" @click="billStore.deleteBillDetail(index)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-form>
      </v-card-text>
      <v-btn  color="#8ad879" class="ma-4" @click="billStore.addBillDetail">
                  Add Bill Detail
                </v-btn>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="billStore.dialog = false,reCode()">
                  Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save()"> Save </v-btn>
              </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.dialog1 {
  width: 50vw;
}
</style>