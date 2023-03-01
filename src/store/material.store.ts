import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Material } from './types/material.type';
import materialService from '@/services/material';
import { useLoadingStore } from '@/store/loading';


export const useMaterialStore = defineStore('material', () => {
  const loadingStore = useLoadingStore();
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const dialog = ref(false);
  const materials = ref<Material[]>([]);
  const editedMaterial = ref<Material>({
    name: "",
    minquantity: 0,
    quantity: 0,
    unit: 0,
    price_per_unit:0}); 


  async function getMaterials() {
    loadingStore.isLoading = true;
    try{
      const res = await materialService.getMaterials();
      materials.value = res.data;
    } catch (e) {
      console.log(e);
  }
  loadingStore.isLoading = false;
}
async function saveMaterial() {
  loadingStore.isLoading = true;
    try {
      if (editedMaterial.value.id) {
         await materialService.updateMaterial(editedMaterial.value.id,editedMaterial.value);
      } else {
  
        const res = await materialService.saveMaterial(editedMaterial.value);
        console.log(res.data);
      }

      dialog.value = false;
      await getMaterials();
    } catch (e) {
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  function editMaterial(material: Material) {
    editedMaterial.value = JSON.parse(JSON.stringify(material));
    dialog.value = true;
  }
  async function deleteMaterial(id: string) {
    await materialService.deleteMaterial(id);
    await getMaterials()
  }
  const selectMaterialAll = async () => {
    if (!allSelected.value) {
      selected.value = materials.value.map((material) => material.id + '')
    }
  }
  const selectMaterial = () => {
    allSelected.value = false
  }
  const deleteMaterials = async () => {
    for (let i = 0; i < selected.value.length; i++) {
      await materialService.deleteMaterial(selected.value[i])
      await getMaterials()
    }
  }
  return { materials,getMaterials,dialog,editMaterial,editedMaterial,saveMaterial,deleteMaterial,deleteMaterials,selectMaterial,selectMaterialAll,allSelected,selected}
})
