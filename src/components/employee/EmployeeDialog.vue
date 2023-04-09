<script lang="ts" setup>
import { useEmployeeStore } from '@/store/employee.store'
import { ref } from 'vue'
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import type { VForm } from 'vuetify/components'
const form = ref<VForm | null>(null)
const url = import.meta.env.VITE_URL_PORT
const confirmDlg = ref();
const employeeStore = useEmployeeStore()
async function save() {
    const { valid } = await form.value!.validate()
    if (valid) {
        await confirmDlg.value.openDialog("Please Confirm", `Do you want to save this employee?`, 'Accept', 'Cancel');
        await employeeStore.saveEmployee()
    }
}
</script>
<template>
    <ConfirmDialog ref="confirmDlg"></ConfirmDialog>
    <v-dialog v-model="employeeStore.dialog" persistent width="1024">
        <v-card>
            <v-container>
                <v-card-title>
                    <span class="text-h5">Employee</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-container>
                            <v-row justify="center">
                                <v-avatar size="80"><v-img
                                        :src="`${url}/employees/image/${employeeStore.editEmployee.image}`"></v-img></v-avatar>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="name*" required v-model="employeeStore.editEmployee.name"
                                        :rules="[(v) => !!v || 'name is required']"></v-text-field>
                                </v-col>
                                <v-col cols="md-8">
                                    <v-text-field label="address*" required v-model="employeeStore.editEmployee.address"
                                        :rules="[(v) => !!v || 'address is required']"></v-text-field>
                                </v-col>
                                <v-col cols="md-4">
                                    <v-text-field label="tel*" required v-model="employeeStore.editEmployee.tel"
                                        :rules="[(v) => !!v || 'tel is required']"></v-text-field>
                                </v-col>
                                <v-col cols="md-4">
                                    <v-text-field label="email*" required v-model="employeeStore.editEmployee.email"
                                        :rules="[(v) => !!v || 'email is required']"></v-text-field>
                                </v-col>
                                <v-col cols="md-4">
                                    <v-select label="position*" v-model="employeeStore.editEmployee.position"
                                        :items="['Barista', 'Cashier', 'Manager', 'Baker', 'Server', 'Cleaner']">
                                    </v-select>

                                </v-col>
                                <v-col cols="md-4">
                                    <v-text-field label="hourly*" required
                                        v-model.number="employeeStore.editEmployee.hourly"
                                        :rules="[(v) => !!v || 'Hourly is required']"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input color="deep-purple-accent-4" counter multiple
                                        placeholder="Select your files" prepend-icon="mdi-paperclip" variant="outlined"
                                        :show-size="1000" label="File input" accept="image/png, image/jpeg, image/bmp"
                                        v-model="employeeStore.editEmployee.files"></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" variant="text" @click="employeeStore.dialog = false">
                        Close
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green" variant="text" @click="save"> Save </v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-dialog>
</template>
