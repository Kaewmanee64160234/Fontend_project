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

</script>

<template>
    <v-container>
        <v-card>
            <v-card-title>
                Employee
                <v-spacer> </v-spacer>

                <v-table class="text-center mt-5">
                    <v-row>
                        <v-col colspan="2">
                            <v-avatar size="80" color="black"></v-avatar>
                            <div class="d-flex align-center flex-column" >
                                <div class="text-subtitle-2 mt-3">nontiya</div>
                                
                                <v-card class="mt-3" width="350" title="This is a title" subtitle="This is a subtitle" text="This is content"></v-card>

                            </div>

                        </v-col>


                    </v-row>

                </v-table>

                <v-table height="400px">
                    <thead>
                        <tr>
                            <th class="text-left"> </th>
                            <th class="text-left"></th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th class="text-center ml-5">
                                Checkin
                            </th>
                            <th class="text-center mr-5">
                                Checkout
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ name }}</td>

                        </tr>
                    </tbody>
                </v-table>


            </v-card-title>

        </v-card>
    </v-container>
</template>


