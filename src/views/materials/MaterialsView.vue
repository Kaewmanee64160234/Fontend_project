<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useMaterialStore } from '@/store/material.store.js';
import MaterialsDialog from '@/components/material/MaterialsDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import router from '@/router';
import AddBillDialog from '@/components/material/AddBillDialog.vue';
import { useBillStore } from '@/store/bill.store';
const billStore = useBillStore();
const materialStore = useMaterialStore();
const confirmDlg = ref();
const paginate = ref(true);

// const goTo = (index:string) => { 
//     router.push('/material/' + index);
// }
const ToCheckMaterial = (index:string) => { 
    router.push('/checkmaterial/' + index);
}

const ToShowBill = (index:string) => { 
    router.push('/showBillById/' + index);
}



onMounted(async() => {
  if(paginate.value) {
    materialStore.cat = ''
    await billStore.getBills();
  } else {
    await materialStore.getViewMaterial();
  }
})

onMounted(async () => {
  await billStore.getBills();
  await materialStore.getMaterials();
})


const deleteMaterial = async (id: string) => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบสินค้านี้ใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  materialStore.deleteMaterial(id)
}
const deleteAllMaterials = async () => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบข้อมูลสินค้าทั้งหมดใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  await materialStore.deleteMaterials()
}

watch(paginate, async (newPage, oldPage) => {
  if (paginate.value) {
    materialStore.cat = ''
    await materialStore.getMaterials()
  } else {
    await materialStore.getViewMaterial()
  }
})
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <MaterialsDialog></MaterialsDialog>
    <AddBillDialog></AddBillDialog>
    <v-container v-if="paginate">
    <v-card>
     <v-card-title>
      <div class="row">
          <div class="col-md-9">
            Material
      </div>
      <div class="col-md-3">
        <v-switch style="float: right;" v-model="paginate" hide-details inset color="info" :label="paginate ? 'Show Data': 'Show View'"></v-switch>
      </div>
    </div>
      <v-btn class="mdi mdi-plus" style="float: right; background-color: #8ad879; color: white"
          @click="materialStore.dialog = true">Add New Material</v-btn>
          <v-btn class="mdi mdi-receipt-text-plus-outline mr-2" color="#AD7BE9" style="float: right; color: white" @click="billStore.dialog = true">Add Bill</v-btn>
          <v-btn class="mdi mdi-clipboard-list-outline mr-2" color="#FFA559" style="float: right; color: white" to="/material/showBills" value="showBills">Show Bill</v-btn>
          <v-spacer></v-spacer>
      <v-text-field style="width: 23%;"

        :loading="materialStore.loading"
        density="compact"
        variant="solo"
        v-model="materialStore.keyword"
        label="Search"
        append-inner-icon="mdi-magnify"
        hide-details
        @click:append-inner="materialStore.getMatByName"
      ></v-text-field>
    </v-card-title>
    <v-table class="text-center mt-5">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Min_quantity</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price_per_unit</th>
                <th>Operations</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in materialStore.materials" :key="index" style="text-align:center">
                <td>{{ index+1 }}</td>
                <td v-if="item.min_quantity <= 5" style="color: red;">{{ item.name }}</td>
                <td v-if="item.min_quantity > 5">{{ item.name }}</td>
                <td>{{ item.min_quantity }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price_per_unit }}</td>
                <td><v-btn color="#FFDD83" class="mr-5" icon="mdi-pencil" @click="materialStore.editMaterial(item)"></v-btn>
                <v-btn color="#F55050" class="mr-5" icon="mdi-delete" @click="deleteMaterial(item.id + '')"></v-btn>
                <v-btn color="#98DFD6" class="mr-5" icon="mdi-clipboard-check-outline" @click="ToShowBill(item.id+'')" ></v-btn>
                <v-btn color="#A1887F" icon="mdi-text-box-check-outline" @click="ToCheckMaterial(item.id+'')" ></v-btn>
              </td>
            </tr>
        </tbody>
        <tbody v-if="materialStore.materials.length == 0" >
          <tr >
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
    </v-table>
    <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="materialStore.page" :length="materialStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
</v-card>
</v-container>


<v-container v-else>
    <v-card>
      <v-card-title>
      <div class="row">
          <div class="col-md-9">
            Material
      </div>
      <div class="col-md-3">
    <v-switch style="float: right;" v-model="paginate" hide-details inset color="info" :label="paginate ? 'Show Data': 'Show View'"></v-switch>
  </div> 
</div>
      <v-btn class="mdi mdi-plus" style="float: right; background-color: #8ad879; color: white"
          @click="materialStore.dialog = true">Add New Material</v-btn>
          <v-btn class="mdi mdi-receipt-text-plus-outline mr-2" color="#AD7BE9" style="float: right; color: white" @click="billStore.dialog = true">Add Bill</v-btn>
          <v-btn class="mdi mdi-clipboard-list-outline mr-2" color="#FFA559" style="float: right; color: white" to="/material/showBills" value="showBills">Show Bill</v-btn>
          <v-spacer></v-spacer>
      <v-text-field style="width: 30%;"
        :loading="materialStore.loading"
        density="compact"
        variant="solo"
        v-model="materialStore.keyword"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        hide-details
        @click:append-inner="materialStore.getMatByName"
      ></v-text-field>
    </v-card-title>
    <v-table class="text-center mt-5">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Min_quantity</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price_per_unit</th>
                <th>Operations</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in materialStore.materials" :key="index" style="text-align:center">
               

                <td>{{ index+1 }}</td>
                <td v-if="item.min_quantity <= 5" style="color: red;">{{ item.name }}</td>
                <td v-if="item.min_quantity > 5">{{ item.name }}</td>
                <td>{{ item.min_quantity }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price_per_unit }}</td>
                <td><v-btn color="#FFDD83" class="mr-5" icon="mdi-pencil" @click="materialStore.editMaterial(item)"></v-btn>
                <v-btn color="#F55050" class="mr-5" icon="mdi-delete" @click="deleteMaterial(item.id + '')"></v-btn>
                <v-btn color="#98DFD6" class="mr-5" icon="mdi-clipboard-check-outline" @click="ToShowBill(item.id+'')" ></v-btn>
                <v-btn color="#A1887F" icon="mdi-text-box-check-outline" @click="ToCheckMaterial(item.id+'')" ></v-btn>
              </td>
            </tr>
        </tbody>
        <tbody v-if="materialStore.materials.length == 0" >
          <tr >
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
    </v-table>
    <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="materialStore.page" :length="materialStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
</v-card>
</v-container>

</template>
