<script lang="ts" setup>
import { useUserStore } from '@/store/user.store';
import ConfirmUserDialog from "@/components/ConfirmUserDialog.vue";
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
const form = ref<VForm | null>(null);
const url = import.meta.env.VITE_URL_PORT
const userStore = useUserStore();
const confirmUserDlg = ref();

async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await confirmUserDlg.value.openDialog("ยืนยันการแก้ไข", `กรุณาใส่Passwordอีกครั้ง`, 'Save', 'Cancel');
    await userStore.saveUser()
  }

}
</script>

<template>
  <ConfirmUserDialog ref="confirmUserDlg"></ConfirmUserDialog>
  <v-dialog v-model="userStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row justify="center">
                                <v-avatar size="80"><v-img
                                        :src="`${url}/employees/image/${userStore.editedUser.image}`"></v-img></v-avatar>
                            </v-row>
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
                <v-text-field label="Password*" required v-model="userStore.editedUser.password"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete label="Autocomplete" v-model="userStore.editedUser.role" :items="['Owner', 'Employee']"></v-autocomplete>
              </v-col>
              <v-file-input color="deep-purple-accent-4" counter multiple placeholder="Select your files"
                  prepend-icon="mdi-paperclip" variant="outlined" :show-size="1000" label="File input"
                  accept="image/png, image/jpeg, image/bmp" v-model="userStore.editedUser.files"></v-file-input>
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