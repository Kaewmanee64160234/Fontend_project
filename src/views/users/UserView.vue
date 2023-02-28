<script lang="ts" setup>
import { useUserStore } from '@/store/user.store';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(async () => {
    await userStore.getUsers();
});
</script>
<template>
    <ProductDialog></ProductDialog>
    <v-row>
    <v-col cols="12" md="11">
      <v-btn
        class="mt-5 mb-2 mdi mdi-plus"
        style="float: right; background-color: #8ad879; color: white" @click="userStore.dialog = true"
        >Add User</v-btn>
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
                <td>
          <v-btn class="mr-5" @click="userStore.dialog = true"
            >Edit </v-btn
          ><v-btn>Delete</v-btn>
        </td>

            </tr>
        </tbody>
    </v-table>

  </v-card>
</v-container>
</template>