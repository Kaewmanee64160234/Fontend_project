<script lang="ts" setup>
import { useUserStore } from '@/store/user.store';

const userStore = useUserStore();
</script>

<template>
   <v-dialog v-model="userStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
                <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Username*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Login*"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Password*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Role*"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click ="userStore.dialog = false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click ="userStore.dialog = false"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>