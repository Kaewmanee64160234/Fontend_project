<script lang="ts" setup>


const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

});
</script>

<template >
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card width="400">
                <v-card-item class="text-center">
                  <v-card-title>{{ props.name }}</v-card-title>
          
                  <v-card-subtitle>{{ props.cost }}</v-card-subtitle>
                </v-card-item>
          
                <v-card-text>
                  <v-img :src="props.img" width="120px"></v-img>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  
</template>
