<script setup lang="ts">
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
const loginName = ref("");
const password = ref("");
const valid = ref(true);
const form = ref<InstanceType<typeof VForm> | null>(null);
const login = async () => {
    const { valid } = await form.value!.validate();
    if (valid) {
        console.log("success");
    }
};
const reset = () => {
    form.value?.reset();
};
</script>

<template>
    <v-app>
        <v-main class="bg-blue-grey pa-5">
            <v-card width="400px" class="mx-auto">
                <v-img src="https://i.pinimg.com/564x/e2/90/49/e290496e2521d29d3ac34af6e5d18c42.jpg" height="200px" cover></v-img>
                <v-card-title primary-title class="text-center">
                    Login
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field v-model="loginName" label="Login Name" :rules="[
                            (v) => !!v || 'Email is required',
                            (v) =>
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                'Email is not valid!!',
                        ]" required></v-text-field>
                        <v-text-field v-model="password" label="Password" type="password" :rules="[
                            (v) => !!v || 'Password is required',
                            (v) =>
                                v.length >= 8 ||
                                'Password must be more than or equal 8 characters',
                        ]" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="success" @click="login">Login</v-btn>
                    <v-btn color="error" @click="reset">Clear</v-btn>
                </v-card-actions>
            </v-card>
        </v-main>
    </v-app>
</template>
