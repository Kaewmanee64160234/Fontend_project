<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { onMounted, ref } from 'vue';
import ProductDialog from '../../components/product/ProductDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const productStore = useProductStore();
const confirmDlg = ref();
const url = import.meta.env.VITE_URL_PORT
onMounted(async () => {

  await productStore.getProducts();
});
const deleteProduct = async (id:number) => {
  await confirmDlg.value.openDialog("Pleases Confirm", `Do you want delete this product`,'Accept','Cancel');
    productStore.deleteProduct(id);
};
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <ProductDialog></ProductDialog>
  <v-container>
    <v-card>
      <v-card-title>
        Products
        <v-btn class="mdi mdi-plus" style="float: right; background-color: #8ad879; color: white"
          @click="productStore.dialog = true">Add New Product</v-btn>
        <v-spacer>
        </v-spacer>
        <v-text-field  
          style="width: 20%"
          variant="solo"
          color="deep-purple-accent-4"
          class="mt-7"
          density="compact"
          append-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details></v-text-field>
      </v-card-title>

      <v-table >
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Size</th>
            <th>Operations</th>

          </tr>
        </thead>
        <tbody>
          <tr style="text-align:center" v-for="item of productStore.products" :key="item.id">
            <td><v-checkbox
                  class="d-flex pa-4"
                  color="indigo"
                ></v-checkbox></td>
            <td>{{ item.id }}</td>
            <td><v-avatar size="80"><v-img :src="`${url}/products/image/${item.image}`"></v-img></v-avatar></td>
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.size }}</td>
            <td>
              <v-btn color="yellow" class="mr-5"  @click="productStore.editProduct(item)">Edit </v-btn>
              <v-btn color="#F55050" @click="deleteProduct(item.id!)">Delete</v-btn>
            </td>

          </tr>
        </tbody>
      </v-table>

    </v-card>
  </v-container>
</template>