<script lang="ts" setup>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ToppingDialog from '@/components/topping/ToppingDialog.vue';
import { useToppingStore } from '@/store/topping.store';
import { onMounted, ref, computed } from 'vue';

const confirmDlg = ref()
const toppingStore = useToppingStore();
const toppings = computed(() => {
  if (!toppingStore.search) {
    return toppingStore.toppings
  } else {
    return toppingStore.toppings.filter((topping) => {
      return topping.name.toLocaleLowerCase().includes(toppingStore.search)
    })
  }
})
onMounted(async () => {
  await toppingStore.getToppings()
})
const deleteTopping = async (id: number) => {
  await confirmDlg.value.openDialog(
    'Please Confirm',
    `Do you want to delete this topping?`,
    'Accept',
    'Cancel'
  )
  toppingStore.deleteTopping(id)
}
const deleteAllToppings = async () => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบข้อมูลของสาขาทั้งหมดใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  toppingStore.deleteAllTopping()
}
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <ToppingDialog></ToppingDialog>
  <VContainer>
    <VCard>
      <VCardTitle>
        <div class="row">
          <div class="col-md-9">Topping</div>
        </div>
        <v-row class="mt-2">
          <v-col cols="3">
            <VTextField
              variant="solo"
              color="deep-purple-accent-4"
              density="compact"
              append-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              v-model="toppingStore.keyword"
            >
            </VTextField>
          </v-col>
          <v-col>
            <VBtn
              class="mdi mdi-plus"
              style="float: right; color: white"
              color="#8ad879"
              @click="toppingStore.dialog = true"
              >Add new store</VBtn
            >
          </v-col>
        </v-row>
        <VSpacer> </VSpacer>
        <VTable class="text-center mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style="height: 65px"
              v-for="(item, index) of toppings"
              :key="index"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>

              <td>
                <VBtn
                  color="#FFDD83"
                  class="mr-5"
                  icon="mdi-pencil"
                  @click="toppingStore.editTopping(item)"
                >
                </VBtn>
                <VBtn
                  color="#F55050"
                  class="mr-5"
                  icon="mdi-delete"
                  @click="deleteTopping(item.id!)"
                ></VBtn>
              </td>
            </tr>
          </tbody>
          <tbody v-if="toppings.length == 0">
            <tr>
              <td colspan="7" class="text-center">No data</td>
            </tr>
          </tbody>
        </VTable>

        <v-container width="100%" justify="center">
          <v-pagination
            justify="center"
            v-model="toppingStore.page"
            :length="toppingStore.lastPage"
            rounded="circle"
          ></v-pagination>
        </v-container>
      </VCardTitle>
    </VCard>
  </VContainer>
</template>
