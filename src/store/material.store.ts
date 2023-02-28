import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Material } from './types/material.type';

export const useMaterialStore = defineStore('material', () => {
  const materials = ref<Material[]>([]); 

  return { materials }
})
