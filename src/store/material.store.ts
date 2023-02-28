import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Material } from './types/material.type';
import materialService from '@/services/material';

export const useMaterialStore = defineStore('material', () => {
  const dialog = ref(false);
  const materials = ref<Material[]>([]);
  const editedMaterial = ref<Material>({
    name: "",
    minquantity: 0,
    quantity: 0,
    unit: 0,
    price_per_unit:0}); 

  async function getMaterials() {
    try{
      const res = await materialService.getMaterial();
      materials.value = res.data;
    } catch (e) {
      console.log(e);
  }
}
async function saveMaterial() {
  try {
    if(editedMaterial.value.id) {
      const res = await materialService.updateMaterial(
        editedMaterial.value.id,editedMaterial.value
      );
    } else {
      const res = await materialService.saveMaterial(editedMaterial.value);
    }
    dialog.value = false;
    await getMaterials();
  } catch (e) {
    console.log(e);
  }
}
  function editMaterial(material: Material) {
    editedMaterial.value = JSON.parse(JSON.stringify(material));
    dialog.value = true;
  }
  async function deleteMaterial(id: number) {
    try {
      const res = await materialService.deleteMaterial(id);
      await getMaterials();
    } catch (e) {
      console.log(e);
    }
  }
  return { materials,getMaterials,dialog,editMaterial,editedMaterial,saveMaterial,deleteMaterial}
})
