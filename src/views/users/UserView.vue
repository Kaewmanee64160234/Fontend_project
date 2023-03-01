<script lang="ts" setup>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import UserDialog from '@/components/user/UserDialog.vue';
import { useUserStore } from '@/store/user.store';
import { onMounted, ref } from 'vue';
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
  await userStore.deleteAllUser()
}
</script>
<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <UserDialog></UserDialog>
   <VContainer>
    <VCard>
      <VCardTitle>
        User
        <VBtn
          class="mdi mdi-plus"
          style="float: right; color: white"
          color="#8ad879"
          @click="userStore.dialog = !userStore.dialog"
          >Add new user</VBtn
        >
        <VBtn class="mdi mr-2" style="float: right; color: white" color="red" @click="deleteAllUsers">Delete All</VBtn>
        <VSpacer> </VSpacer>
        <VTextField
          style="width: 20%"
          variant="solo"
          color="deep-purple-accent-4"
          class="mt-7"
          density="compact"
          append-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></VTextField>
        <VTable class="text-center mt-5">
          <thead>
            <tr>
              <th>
                <VCheckbox
                  class="d-flex pa-4"
                  color="indigo"
                  v-model="userStore.allSelected"
                  @click="userStore.selectUserAll"
                ></VCheckbox>
              </th>
              <th>ID</th>
              <th>Username</th>
              <th>Login</th>
              <th>Passowrd</th>
              <th>Role</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of userStore.users" :key="item.id" class="text-center">
              <td>
                <VCheckbox
                  class="d-flex pa-4"
                  color="indigo"
                  v-model="userStore.selected"
                  @click="userStore.selectUser()"
                  :value="item.id+''"
                ></VCheckbox>
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.login }}</td>
              <td>{{ item.password }}</td>
              <td>{{ item.role }}</td>
              <td>
                <VBtn class="mr-5" color="yellow" @click="userStore.editUser(item)"
                  >Edit</VBtn
                ><VBtn color="red" @click="deleteUser(item.id!)">Delete</VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardTitle>
    </VCard>
  </VContainer>
</template>