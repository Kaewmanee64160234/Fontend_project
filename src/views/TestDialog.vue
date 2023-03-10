<script lang="ts" setup>
import { ref } from 'vue'
const toggle = ref(null)
const dialog = ref(false)
const dialog2 = ref(false)
const toggle2 = ref(null)
const amenities = ref([])
// const dialog3 = ref(false);
const props = defineProps({
  name: String,
  type: String,
  cat: String
})
</script>
<template>
  <v-row justify="center">
    <v-btn color="primary" v-if="props.cat !== '1' && props.cat !== '3' " class="ma-2" @click="dialog = true"> Open Dialog 1 </v-btn>
    <v-dialog v-model="dialog" width="600px" >
      <v-card >
        <v-card-title>
          {{ props.name }}
        </v-card-title>
        <v-card-text v-if="props.cat === '2'">
          <div class="d-flex align-left flex-column">
            <h5>Size</h5>
            <v-btn-toggle v-model="toggle" variant="outlined" divided>
              <v-btn>S</v-btn>
              <v-btn>M</v-btn>
              <v-btn>L</v-btn>
            </v-btn-toggle>
          </div>
          <div
            class="d-flex align-left flex-column"
            v-if="props.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate'"
          >
            <h5>Sweet</h5>

            <v-btn-toggle v-model="toggle2" variant="outlined" divided>
              <v-btn>หวานน้อย</v-btn>
              <v-btn>หวานปกติ</v-btn>
              <v-btn>หวานมาก +10</v-btn>
              <v-btn>หวาน125% +15</v-btn>
            </v-btn-toggle>
          </div>
          <div v-if="props.type === 'tea' || 'smoothies' || 'milkshakes' || 'hot chocolate'">
            <h5>Topping</h5>

            <v-chip-group v-model="amenities" column multiple>
              <v-chip filter variant="outlined"> ไข่มุกบราวชูก้า +10 </v-chip>
              <v-chip filter variant="outlined"> ไข่มุกโกโก้ +10 </v-chip>
              <v-chip filter variant="outlined"> บุก +10 </v-chip>
              <v-chip filter variant="outlined"> วิปครีม +10 </v-chip>
            </v-chip-group>
          </div>
          <div v-if="props.type === 'juice' || 'soda' || 'alcoholic beverages' || 'etc.'"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" variant="text" @click="dialog = false" > Save </v-btn>
          <v-btn color="primary" variant="text" @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-dialog
        v-model="dialog2"
        width="auto"
      >
        <v-card>
          <v-card-title>
            Dialog 2
          </v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              @click="dialog3 = !dialog3"
            >
              Open Dialog 3
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="dialog2 = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog3"
        width="auto"
      >
        <v-card>
          <v-card-title>
            <span>Dialog 3</span>
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="dialog3 = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
  </v-row>
</template>
