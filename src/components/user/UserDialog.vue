<script lang="ts" setup>
import { useUserStore } from '@/store/user.store';
import { onMounted, ref } from 'vue';
import type { VForm } from 'vuetify/components';
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const form = ref<VForm | null>(null);
const url = import.meta.env.VITE_URL_PORT
const userStore = useUserStore();
const confirmDlg = ref();

onMounted( async () => {
  userStore.editedUser.position = 'Barista';
});

async function save() {

  const { valid } = await form.value!.validate();
  if (valid) {
    await confirmDlg.value.openDialog("Please Confirm", `Do you want to save this user?`, 'Accept', 'Cancel');
    await userStore.saveUser()
  }

}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <VDialog v-model="userStore.dialog" persistent width="1024">
    <VCard class="scroll">
      <VCardTitle>
        <span class="text-h5">User</span>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VContainer>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Username*" required v-model="userStore.editedUser.username"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]">
                </VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Login*" required v-model="userStore.editedUser.login"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]">
                </VTextField>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="telephone*" required v-model="userStore.editedUser.telEmployee"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length == 10 || 'Length must equle than 10',]">
                </VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="address*" required v-model="userStore.editedUser.addressEmployee"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]">
                </VTextField>
              </VCol>
            </VRow>

            <VRow>

              <VCol cols="12" sm="6" md="6">
                <VTextField label="Password*" required v-model="userStore.editedUser.password"
                  v-if="!userStore.editedUser.id"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]">
                </VTextField>
                <VTextField label="Password*" required v-model="userStore.editedUser.password" v-else disabled
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]">
                </VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Salary*" required v-model.number="userStore.editedUser.salary"
                  :rules="[(v) => !!v || 'Item is required', (v) => v >= 9000 || 'Must more than 9000 bath',]">
                </VTextField>
              </VCol>

            </VRow>
            <VRow>
              <VCol cols="6" sm="6" md="6">
                
                <VCheckbox label="Full Time Employee" v-model="userStore.editedUser.fullTime"></VCheckbox>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <v-select label="Role" required v-model="userStore.editedUser.role" :items="['Owner', 'Employee']">
                </v-select>
              </VCol>
            </Vrow>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="hour*" required v-model.number="userStore.editedUser.hourly"
                  :rules="[(v) => !!v || 'Item is required', (v) => v >= 30 || 'Length must equle than 30',]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select label="Position*" required v-model="userStore.editedUser.position" :items="['Barista', 'Cashier', 'Manager', 'Baker', 'Server', 'Cleaner']">
                </v-select>
              </v-col>
            </v-row>
            <VFileInput color="deep-purple-accent-4" counter multiple placeholder="Select your files"
              prepend-icon="mdi-paperclip" variant="outlined" :show-size="1000" label="File input"
              accept="image/png, image/jpeg, image/bmp" v-model="userStore.editedUser.files"></VFileInput>
          </VContainer>
        </VForm>
        <small>*indicates required field</small>
      </VCardText>
      <VCardActions>
       
      <VBtn color="red" variant="text" @click="userStore.dialog = false">
        Close
      </VBtn>
      <v-spacer></v-spacer>
      <VBtn color="green" variant="text" @click="save"> Save </VBtn>
    </VCardActions>
  </VCard>
</VDialog></template>
<style>
.scroll {
  overflow: scroll;
}

.scroll::-webkit-scrollbar {
  width: 10px;
  height: 4px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #d5d4d4;
  border-radius: 999px;
}

</style>