<script setup lang="ts">
import { ref } from 'vue';
import { useCustomerStore } from '@/store/customer.store'
const dialog = ref(true)
const customerStore = useCustomerStore()

</script>
<template>
    <v-btn color="#E9A178" class="mt-5" >
      Find Member
    </v-btn>
    <v-dialog persistent v-model="dialog" width="50%">
      <v-card height="500px">
        <v-card-title>
          Find Member

        </v-card-title>
        <v-card-text>

          <v-text-field label="Phone Number" height="20px" hide-details="auto" >
           
          </v-text-field>

            <v-card class="mx-auto" style="margin-top: 10px;">
            <v-list lines="two">
                <v-list-item 
                   ` Point` style="font-size: 15px"> 
                  <template v-slot:append>
                  <v-btn variant="tonal"
                    color="secondary"
                  >Add Point</v-btn>
                  </template>
                  </v-list-item>
            </v-list>
            <!-- <v-list lines="two" v-if="memberStore.IsSerarch" >
              <v-list-item :value="memberStore.thisMember.id" :prepend-icon="mdiAccount" :title="memberStore.thisMember.name"
                style="font-size: 15px;">{{ memberStore.thisMember.Point }} Point<v-btn variant="tonal" color="secondary"
                  style="width: 100px;margin-left: 370px;" @click="memberStore.AddPoint(memberStore.thisMember.Tel)">Add
                  Point</v-btn></v-list-item>
            </v-list> -->
          </v-card>
              <!-- <v-btn
              color="primary"
              class="ma-2"
              @click="dialog2 = true"
            >
              Open Dialog 2
            </v-btn> -->
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" variant="text" >Close
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog >
      <v-card>
        <v-card-title>
          Dialog 2
        </v-card-title>
        <v-card-text>
          <v-btn color="primary">
            Open Dialog 3
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="text">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>