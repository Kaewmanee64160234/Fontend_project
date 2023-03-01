<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { onMounted } from 'vue';
import ProductDialog from '../../components/product/ProductDialog.vue';

const productStore = useProductStore();
const url = import.meta.env.VITE_URL_PORT
onMounted(async () => {
    await productStore.getProducts();
});
</script>
<template>
    <ProductDialog></ProductDialog>
    <v-container>
  <v-card>
    <v-card-title>
      Products
      <v-btn
        class="mdi mdi-plus"
        style="float: right; background-color: #8ad879; color: white" @click="productStore.dialog = true"
        >Add New Product</v-btn>
      <v-spacer>
      </v-spacer>
      <v-text-field
      class="mt-5"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-table>
        <thead>
            <tr>
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
                <td>{{ item.id }}</td>
                <td><v-avatar><v-img :src="`${url}/products/image/${item.image}`"></v-img
                ></v-avatar></td>
                <td>{{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.size }}</td>
                <td>
          <v-btn class="mr-5" @click="productStore.dialog = true"
            >Edit </v-btn
          ><v-btn>Delete</v-btn>
        </td>

            </tr>
        </tbody>
    </v-table>

  </v-card>
</v-container>
</template>