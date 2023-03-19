<script lang="ts" setup>
import { useProductStore } from '@/store/product.store'
import { computed, onMounted, ref } from 'vue'
import ProductDialog from '../../components/product/ProductDialog.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const productStore = useProductStore()
const confirmDlg = ref()
const url = import.meta.env.VITE_URL_PORT
const page = ref(1)
const pageSize = ref(2)
onMounted(async () => {
  await productStore.getProducts()
})
const deleteProduct = async (id: number) => {
  await confirmDlg.value.openDialog(
    'Pleases Confirm',
    `Do you want delete this product ?`,
    'Accept',
    'Cancel'
  )
  productStore.deleteProduct(id)
}

const deleteAllProducts = async () => {
  await confirmDlg.value.openDialog(
    'Pleases Confirm',
    `Do you want delete this product ?`,
    'Accept',
    'Cancel'
  )
  productStore.deleteProducts()
}
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <ProductDialog></ProductDialog>
  <v-container>
    <v-card>
      <v-card-title>
        Products
        <v-btn
          class="mdi mdi-plus"
          style="float: right; background-color: #8ad879; color: white"
          @click="productStore.dialog = true"
          >Add New Product</v-btn
        >
       
        <v-spacer> </v-spacer>
        <v-text-field
          style="width: 30%"
          :loading="productStore.loading"
          density="compact"
          variant="solo"
          v-model="productStore.keyword"
          label="Search templates"
          append-inner-icon="mdi-magnify"
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-table class="text-center mt-5">
        <thead>
          <tr>
    
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Size</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr style="text-align: center" v-for="(item,index) in productStore.products" :key="index">
           
            <td>{{ index+1}}</td>
            <td>
              <v-avatar size="80"
                ><v-img :src="`${url}/products/image/${item.image}`"></v-img
              ></v-avatar>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.size }}</td>
            <td>
              <v-btn
                color="#FFDD83"
                class="mr-5"
                icon="mdi-pencil"
                @click="productStore.editProduct(item)"
              ></v-btn>
              <v-btn
                color="#F55050"
                class="mr-5"
                icon="mdi-delete"
                @click="deleteProduct(item.id!)"
              ></v-btn>
            </td>
          </tr>
          
        </tbody>
      
       
        <tbody v-if="productStore.products.length == 0">
          <tr>
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
      </v-table>
      <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="productStore.page" :length="productStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
    </v-card>
  </v-container>
</template>
