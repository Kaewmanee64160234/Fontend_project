<script lang="ts" setup>
import { useProductStore } from '@/store/product.store';
const productStore = useProductStore();
</script>

<template>
    <v-container>
        <v-row>
            <v-col v-for="item of productStore.products" :key="item.id" cols="3">
                <v-card width="400">
                    <v-card-item>
                      <v-card-title>This is a title</v-card-title>
              
                      <v-card-subtitle>This is a subtitle</v-card-subtitle>
                    </v-card-item>
              
                    <v-card-text>
                      This is content
                    </v-card-text>
                  </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>