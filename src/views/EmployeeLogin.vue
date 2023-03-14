<script setup lang="ts">
import { useEmployeeStore } from '@/store/employee.store'
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
const employeeStore = useEmployeeStore()
const valid = ref(true)
const form = ref<InstanceType<typeof VForm> | null>(null)
const email = ref('')
const name = ref('')
const login = async () => {
    const { valid } = await form.value!.validate()
    if (valid) {
        employeeStore.loginEmployee(email.value, name.value)
    }
}
const clear = () => {
    form.value?.reset();
}
</script>

<template>
    <v-container>
        
        <v-card>
            <v-card-title >
                Employee
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>

                <v-spacer>
                    <v-toolbar flat color="white">
                        <v-avatar size="100"><v-icon icon="mdi-account-circle"></v-icon></v-avatar>

                        <v-toolbar-title class="font-weight-light">
                            nontiya
                        </v-toolbar-title>
                    </v-toolbar>


                </v-spacer>

                <v-spacer> </v-spacer>
                <v-table class="text-center mt-5">
                    <tbody>
                        <tr class="text-center">
                            <v-text-field style=""></v-text-field>

                        </tr>
                        <tr class="text-center">
                            <v-text-field style=""></v-text-field>

                        </tr>
                        <tr class="text-center">
                            <v-text-field style=""></v-text-field>

                        </tr>


                        <td  class="text-center">
                            <v-btn color="green" >Login</v-btn>
                        </td>
                    </tbody>



                </v-table>
            </v-card-title>
        </v-card>
    </v-container>
</template>


