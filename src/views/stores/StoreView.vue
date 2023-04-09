<script lang="ts" setup>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import StoreDialog from '@/components/store/StoreDialog.vue';
import { useStoreStore } from '@/store/store.store';
import { onMounted, ref, computed } from 'vue';
const confirmDlg = ref();
const storeStore = useStoreStore();
const stores = computed(() => {
    if (!storeStore.search) {
        return storeStore.stores;
    } else {
        return storeStore.stores.filter((store) => {
            return store.name.toLocaleLowerCase().includes(storeStore.search
            )
        });
    }
});
onMounted(async () => {
    await storeStore.getStores();
});
const deleteStore = async (id: number) => {
    await confirmDlg.value.openDialog(
        'Please Confirm',
        `Do you want to delete this store?`,
        'Accept',
        'Cancel'
    )
    storeStore.deleteStore(id)
}
const deleteAllStores = async () => {
    await confirmDlg.value.openDialog(
        'ยืนยันการลบ',
        `คุณต้องการลบข้อมูลของสาขาทั้งหมดใช่หรือไม่?`,
        'Accept',
        'Cancel'
    )
    storeStore.deleteAllStore()
}
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <StoreDialog></StoreDialog>
    <VContainer>
        <VCard>
            <VCardTitle>
                <div class="row">
                    <div class="col-md-9">
                        Store
                    </div>
                </div>
                <v-row class="mt-2">
                    <v-col cols="3">
                        <VTextField variant="solo" color="deep-purple-accent-4" density="compact"
                                append-inner-icon="mdi-magnify" label="Search" single-line hide-details
                                v-model="storeStore.keyword">
                            </VTextField>
    
                    </v-col>
                    <v-col>
                        <VBtn class="mdi mdi-plus" style="float: right; color: white" color="#8ad879"
                            @click="storeStore.dialog = true">Add new store</VBtn>
                    </v-col>
                </v-row>
                <VSpacer> </VSpacer>
                <VTable class="text-center mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Tel</th>
                            <th>Operations</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) of stores" :key="index" class="text-center">

                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.tel }}</td>
                            <td>
                                <VBtn color="#FFDD83" class="mr-5" icon="mdi-pencil" @click="storeStore.editStore(item)">
                                </VBtn>
                                <VBtn color="#F55050" class="mr-5" icon="mdi-delete" @click="deleteStore(item.id!)"></VBtn>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="stores.length == 0">
                        <tr>
                            <td colspan="7" class="text-center">No data</td>
                        </tr>
                    </tbody>
                </VTable>

                <v-container width="100%" justify="center">

                    <v-pagination justify="center" v-model="storeStore.page" :length="storeStore.lastPage"
                        rounded="circle"></v-pagination>
                </v-container>
            </VCardTitle>
        </VCard>
    </VContainer>
</template>