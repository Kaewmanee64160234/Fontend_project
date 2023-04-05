<script lang="ts" setup>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import UserDialog from '@/components/user/UserDialog.vue';
import { useUserStore } from '@/store/user.store';
import { onMounted, ref, computed } from 'vue';
const confirmDlg = ref();
const userStore = useUserStore();
onMounted(async () => {
  await userStore.getUsers();
});
const deleteUser = async (id: number) => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบผู้ใช้งานคนนี้ใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  userStore.deleteUser(id)
}
const deleteAllUsers = async () => {
  await confirmDlg.value.openDialog(
    'ยืนยันการลบ',
    `คุณต้องการลบข้อมูลของผู้ใช้งานทั้งหมดใช่หรือไม่?`,
    'Accept',
    'Cancel'
  )
  userStore.deleteAllUser()
}
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <UserDialog></UserDialog>
  <v-container>
    <v-card>
      <v-card-title>
        User
        <v-row>
          <v-col>
            <v-btn class="mdi mdi-plus" style="float: right; color: white" color="#8ad879"
            @click="userStore.dialog = true">Add new user</v-btn>
          </v-col>
          
            <v-col cols="3">
              <v-autocomplete   v-model="userStore.order"  label="Select" :items="['A-Z','Z-A' ]" density="compact">
                <v-autocomplete  @click="userStore.order = 'A-Z'"> A-Z</v-autocomplete>
                <v-autocomplete  @click="userStore.order = 'Z-A'"> Z-A</v-autocomplete>
               
              </v-autocomplete>
  
            </v-col>
        </v-row>
        
        <v-spacer> </v-spacer>
        <v-text-field style="width: 30%;"
        :loading="userStore.loading"
        density="compact"
        variant="solo"
        v-model="userStore.keyword"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        hide-details
        @click:append-inner="userStore.getUserByUsername"
      ></v-text-field>
        <VTable class="text-center mt-5">
          <thead>
            <tr>
              
              <th>ID</th>
              <th>Username</th>
              <th>Login</th>
              <th>Role</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) of userStore.users" :key="index" class="text-center">
              <td>{{ index+1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.login }}</td>
              <td>{{ item.role }}</td>
              <td>
                <VBtn color="#FFDD83" class="mr-5" icon="mdi-pencil" @click="userStore.editUser(item)"></VBtn>
                <VBtn color="#F55050" class="mr-5" icon="mdi-delete" @click="deleteUser(item.id!)"></VBtn>
              </td>
            </tr>
          </tbody>
          <tbody v-if="userStore.users.length == 0" >
          <tr>
            <td colspan="7" class="text-center">No data</td>
          </tr>
        </tbody>
        </VTable>
        <v-container width="100%" justify="center">
       
       <v-pagination  justify="center" v-model="userStore.page" :length="userStore.lastPage" rounded="circle"></v-pagination>

     </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>