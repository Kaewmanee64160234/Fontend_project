<script setup lang="ts">

import { useUserStore } from "@/store/user.store";
import { ref, defineExpose } from "vue";
const userStore = useUserStore();
const dialog = ref(false);
const detail = ref("");
const title = ref("");
const agree = ref("Agree");

const cancel = ref("Cancel");
let onOk: (value:unknown) => void;
let onCancel: (value:unknown) => void;
const cancelBtn = () => {
  try{
    dialog.value = false;
  onCancel("cancel");
  }catch(e){
    console.log(e);
  }

}
const okBtn = () => {
  dialog.value = false;
  onOk("Ok");
}
const openDialog = (
  title_: string,
  desc: string,
  okBtn: string,
  cancel_: string
) => {
  title.value = title_;
  detail.value = desc;
  agree.value = okBtn;
  cancel.value = cancel_;
  dialog.value = true;
  return new Promise((resolve, reject) => {
    onOk = resolve;
    onCancel = reject;
  });




};
defineExpose({ openDialog });
</script>
<template>

  <v-dialog v-model="dialog" persistent width="500">
    <v-card>
      <v-card-item>
        <div>
          <div class="text-overline mb-1">{{ title }}</div>
          <div class="text-h7 mb-1">{{ detail }} </div>
          <div>
                <v-text-field label="New Password*" required v-model="userStore.editedUser.password" v-if="userStore.editedUser.password"
                  :rules="[(v) => !!v || 'Item is required', (v) => v.length >= 3 || 'Length must more than 3',]"></v-text-field>
          </div>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary"  @click="okBtn">
          {{ agree }}
        </v-btn>
        <v-btn color="red"  @click="cancelBtn"> {{ cancel }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
