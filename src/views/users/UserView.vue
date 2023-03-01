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
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <UserDialog></UserDialog>
    <v-row>
    <v-col cols="12" md="11">
      <v-btn
        class="mt-5 mb-2 mdi mdi-plus"
        style="float: right; background-color: #1976D2; color: white" @click="userStore.dialog = true"
        >Add New User</v-btn>
    </v-col>
    </v-row>
    <v-container>
  <v-card>
    <v-card-title>
      Users
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
                <th>Username</th>
                <th>Login</th>
                <th>Password</th>
                <th>Role</th>
                <th>Operations</th>
                
            </tr>
        </thead>
        <tbody>
            <tr style="text-align:center" v-for="item of userStore.users" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.login }}</td>
                <td>{{ item.password }}</td>
                <td>{{ item.role }}</td>
                <td><v-btn class="mr-5" color="secondary" @click="userStore.editUser(item)"><v-icon icon="mdi-pencil" class="mr-1" size="25"></v-icon>Edit</v-btn>
            <v-btn color="error" @click="userStore.deleteUser(item.id!)"><v-icon icon="mdi-delete" class="mr-1" size="25"></v-icon>Delete</v-btn>
          </td>

            </tr>
        </tbody>
    </v-table>

  </v-card>
</v-container>
</template>