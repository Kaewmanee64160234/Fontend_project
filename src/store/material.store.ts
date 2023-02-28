import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Material } from './types/material.type';
import materialService from '@/services/material';

export const useMaterialStore = defineStore('material', () => {
  const materials = ref<Material[]>([]); 

  async function getMaterials() {
    try{
      const res = await materialService.getMaterial();
      materials.value = res.data;
    } catch (e) {
      console.log(e);
  }
}
  return { materials,getMaterials }
})
