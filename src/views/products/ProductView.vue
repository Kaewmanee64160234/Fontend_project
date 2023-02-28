<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { onMounted } from 'vue';
import ProductDialog from './ProductDialog.vue';

const productStore = useProductStore();

onMounted(async () => {
    await productStore.getProducts();
});
</script>
<template>
    <ProductDialog></ProductDialog>
    <v-row>
    <v-col cols="12" md="11">
      <v-btn
        class="mt-5 mb-2 mdi mdi-plus"
        style="float: right; background-color: #8ad879; color: white" @click="productStore.dialog = true"
        >Add New</v-btn>
    </v-col>
    </v-row>
    <v-container>
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
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
                <td>{{ item.img }}</td>
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