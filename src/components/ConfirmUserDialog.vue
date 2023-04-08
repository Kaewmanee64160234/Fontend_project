<script setup lang="ts">

import Swal from "sweetalert2";
import { ref, defineExpose } from "vue";
const dialog = ref(false);
const detail = ref("");
const title = ref("");
const agree = ref("Agree");

const cancel = ref("Cancel");
let onOk: (value: unknown) => void;
let onCancel: (value: unknown) => void;
const cancelBtn = () => {
    try {
        dialog.value = false;
        onCancel("cancel");
    } catch (e) {
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
    <v-dialog v-model="dialog"  max-width="700" style="z-index: 99999999;">
        <v-card class="mx-auto" max-width="700">
            <v-card-item>
                <div>
                    <div class="text-overline mb-1">{{ title }}</div>
                    <v-responsive class="mx-auto" max-width="344">
                        <v-text-field label="Password" type="input" hint="Enter your password to access this website"></v-text-field>
                    </v-responsive>
                </div>
            </v-card-item>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="okBtn">
                    {{ agree }}
                </v-btn>
                <v-btn color="red" @click="cancelBtn"> {{ cancel }} </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

