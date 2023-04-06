<script lang="ts" setup>
import { useUserStore } from '@/store/user.store';
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const form = ref<VForm | null>(null);
const url = import.meta.env.VITE_URL_PORT
const userStore = useUserStore();
const confirmDlg = ref();
async function save() {
 
  const { valid } = await form.value!.validate();
  if (valid) {
    await confirmDlg.value.openDialog("ยืนยันการแก้ไข", `คุณต้องการแก้ไขข้อมูลผู้ใช้คนนี้ใช่หรือไม่?`, 'Accept', 'Cancel');
    await userStore.saveUser()
  }

}
</script>

<template>
  <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
  <VDialog v-model="userStore.dialog" persistent width="1024">
    <VCard>
      <VCardTitle>
        <span class="text-h5">User</span>
      </VCardTitle>
      <VCardText>
        <VForm ref="form">
          <VContainer>
            <VRow justify="center">
              <VAvatar size="80"><VImg :src="`${url}/employees/image/${userStore.editedUser.image}`"></VImg></VAvatar>
            </VRow>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Username*" required v-model="userStore.editedUser.username"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Login*" required v-model="userStore.editedUser.login"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></VTextField>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="telephone*" required v-model="userStore.editedUser.telEmployee"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length == 10 || 'Length must equle than 10',]"></VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="address*" required v-model="userStore.editedUser.addressEmployee"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></VTextField>
              </VCol>
            </VRow>

            <VRow>

              <VCol cols="12" sm="6" md="6">
                <VTextField label="Password*" required v-model="userStore.editedUser.password"
                  v-if="!userStore.editedUser.id"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></VTextField>
                <VTextField label="Password*" required v-model="userStore.editedUser.password" v-else disabled
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="Salary*" required v-model.number="userStore.editedUser.salary"
                  :rules="[(v) => !!v || 'Item is required', (v) => v >= 9000 || 'Must more than 9000 bath',]"></VTextField>
              </VCol>

            </VRow>
            <VRow>
              <VCol cols="6" sm="6" md="6">
                <VCheckbox label="FullTime Employee" v-model="userStore.editedUser.fullTime"></VCheckbox>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                <VAutocomplete label="Role" required v-model="userStore.editedUser.role"
                  :items="['Owner', 'Employee']"></VAutocomplete>
              </VCol>


            </VRow>
            <VRow>
              <VCol cols="12" sm="6" md="6">
                <VTextField label="hour*" required v-model.number="userStore.editedUser.hourly"
                  :rules="[(v) => !!v || 'Item is required', (v) => v >= 30 || 'Length must equle than 30',]"></VTextField>
              </VCol>
              <VCol cols="12" sm="6" md="6">
                 <VTextField label="position*" required v-model="userStore.editedUser.position"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must equle than 3',]"></VTextField>
              </VCol>
            </VRow>
            <VFileInput color="deep-purple-accent-4" counter multiple placeholder="Select your files"
              prepend-icon="mdi-paperclip" variant="outlined" :show-size="1000" label="File input"
              accept="image/png, image/jpeg, image/bmp" v-model="userStore.editedUser.files"></VFileInput>
          </VContainer>
        </VForm>
        <small>*indicates required field</small>
      </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="blue-darken-1" variant="text" @click="userStore.dialog = false">
          Close
        </VBtn>
        <VBtn color="blue-darken-1" variant="text" @click="save"> Save </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>