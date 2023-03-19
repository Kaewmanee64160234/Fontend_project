<script setup lang="ts">
import { useBillDetailStore } from '@/store/billdetail.store';
import { useBillStore } from '@/store/bill.store';
import type BILL_DETAIL from '@/store/types/billdetail';
import { ref } from 'vue';
const billdetailStore = useBillDetailStore();
const billStore = useBillStore();

const billDettailList = ref<BILL_DETAIL[]>([{ name: 'test',amount:3,price:2,total:0}]);
const addBillDetail = () => {
  const newdetail = ref<BILL_DETAIL>({ name: 'test',amount:3,price:2,total:0});
  billDettailList.value.push(newdetail.value);

}
const deleteBillDetail = (index: number) => {
  billDettailList.value.splice(index, 1);
  // console.log(index);
}
</script>
<template>
   <v-dialog persistent width="1024" v-model="billdetailStore.dialog">
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
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Name Shop*"
                  required
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Name*"
                  required
                 
                  :rules="[(v) => !!v || 'Item is required',
                (v) => v >= 0 || 'Min_quantity must more than 0']"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Quantity*"
                  required
                 
                  :rules="[(v) => !!v || 'Item is required',
                (v) => v > 0 || 'Quantity must more than 0']"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Price_per_unit*"
                  required
                 
                  :rules="[(v) => !!v || 'Item is required',
                    (v) => v > 0 || 'Price_per_unit must more than 0']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card>
        <v-card-text style="overflow-y: auto;">
          <v-container width="80%">
            <v-card class="pa-5 ma-2 dialog1" v-for="(item,index) in billDettailList" :key="index">
            <v-card-title><p>Bill detail {{ index+1 }}</p></v-card-title>
              <v-text-field
        v-model="item.name"
        label="Name"
      ></v-text-field> 
      <v-text-field
        v-model="item.price"
        label="Name"
      ></v-text-field> 
      <v-text-field
        v-model="item.amount"
        label="Name"
      ></v-text-field> 
      <v-card-actions>
        <v-spacer>

        </v-spacer>
        <v-btn color="ref" @click="deleteBillDetail(index)">Delete</v-btn>
      </v-card-actions>
          </v-card>
        
          </v-container>


        </v-card-text>
        <v-btn
  color="success"
  class="ma-4"
  block
  @click="addBillDetail"
>
  Add Bill Detail
</v-btn>
        <v-card-actions>
          <v-btn color="primary" block @click="billdetailStore.dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="billdetailStore.dialog = false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" > Save </v-btn>
      </v-card-actions>
    </v-card>
   </v-dialog>
</template>

<style>
.dialog1 {
    width: 50vw;
}
</style>