<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
import { computed, onMounted, ref } from 'vue';
import ProductDialog from '../../components/product/ProductDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const productStore = useProductStore();
const confirmDlg = ref();
const url = import.meta.env.VITE_URL_PORT

const products = computed(() => {
  if (!productStore.search) {
    return productStore.products;
  } else {
    return productStore.products.filter((product) => {
      return product.name.toLocaleLowerCase().includes( productStore.search
      )
    });
  }
});
onMounted(async () => {

  await productStore.getProducts();
});
const deleteProduct = async (id: number) => {
  await confirmDlg.value.openDialog("Pleases Confirm", `Do you want delete this product ?`, 'Accept', 'Cancel');
  productStore.deleteProduct(id);
};

const deleteAllProducts = async () => {
  await confirmDlg.value.openDialog("Pleases Confirm", `Do you want delete this product ?`, 'Accept', 'Cancel');
  productStore.deleteProducts();
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
        <v-btn class="mdi mdi-delete mr-2" style="float: right; color: white" color="red"
          @click="deleteAllProducts">Delete All</v-btn>
        <v-spacer>
        </v-spacer>
            <v-text-field style="width: 20%" variant="solo" color="deep-purple-accent-4" class="mt-7" density="compact"
              append-inner-icon="mdi-magnify" label="Search" single-line hide-details v-model="productStore.search"></v-text-field>
      </v-card-title>

      <v-table class="text-center mt-5">
        <thead>
          <tr>
            <th>
              <v-checkbox class="d-flex pa-4" color="indigo" v-model="productStore.allSelected"
                @click="productStore.selectProductAll"></v-checkbox>
            </th>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Size</th>
            <th>Operations</th>

          </tr>
        </thead>
        <tbody>
          <tr style="text-align:center" v-for="item of products" :key="item.id">
            <td><v-checkbox class="d-flex pa-4" color="indigo" v-model="productStore.selected"
                @click="productStore.selectProduct" :value="item.id + ''"></v-checkbox></td>
            <td>{{ item.id }}</td>
            <td><v-avatar size="80"><v-img :src="`${url}/products/image/${item.image}`"></v-img></v-avatar></td>
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.size }}</td>
            <td>
              <v-btn color="#FFDD83" class="mr-5" icon="mdi-pencil" @click="productStore.editProduct(item)"></v-btn>
              <v-btn color="#F55050" class="mr-5" icon="mdi-delete" @click="deleteProduct(item.id!)"></v-btn>
            </td>

          </tr>
        </tbody>
        <tbody v-if="products.length == 0" >
          <tr >
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
      </v-table>

    </v-card>
  </v-container>
</template>