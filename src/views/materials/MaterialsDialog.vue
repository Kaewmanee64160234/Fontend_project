<script lang="ts" setup></script>
<template>
     <v-dialog persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Material</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Min_quantity*"
                  required
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Quantity*"
                  required
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Unit*"
                  required
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price_per_unit*"
                  required
                  :rules="[(v) => !!v || 'Item is required']"
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
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" > Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
