<script lang="ts" setup>
import { useCustomerStore } from '@/store/customer.store'

const customerStore = useCustomerStore()
</script>
<template>
    <v-row justify="center">
      <v-dialog
        v-model="customerStore.addCustomerDialog"
        persistent
        width="1024"
      >
        
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Customer</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="First name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Last name*"
                    required
                  ></v-text-field>
                </v-col>

                
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Tel."
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    :items="['Male', 'Female']"
                    label="Gender"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="customerStore.addCustomerDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="customerStore.addCustomerDialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>