<script lang="ts" setup>
import { useUserStore } from '@/store/user.store';
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
const form = ref<VForm | null>(null);
const userStore = useUserStore();
const confirmDlg = ref();

async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await confirmDlg.value.openDialog("ยืนยันการแก้ไข", `คุณต้องการแก้ไขข้อมูลผู้ใช้งานคนนี้ใช่หรือไม่?`, 'Accept', 'Cancel');
    await userStore.saveUser()
  }

}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <v-dialog v-model="userStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Username*" required v-model="userStore.editedUser.username"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Login*" required v-model="userStore.editedUser.login"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Password*" required v-model="userStore.editedUser.password" v-if="userStore.editedUser.password == userStore.editedUser.password"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 6 || 'Length must more than 6']"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete label="Autocomplete" v-model="userStore.editedUser.role" :items="['Employee', 'Manager']"></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="userStore.dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>