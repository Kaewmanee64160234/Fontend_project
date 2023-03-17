import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Material } from './types/material.type'
import materialService from '@/services/material'
import { useLoadingStore } from '@/store/loading'
import { useMessageStore } from './message'

export const useMaterialStore = defineStore('material', () => {
  const search = ref('')
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore()
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const dialog = ref(false)
  const dialog2 = ref(false)
  const materials = ref<Material[]>([])
  const BillDialog = ref(true)
  const editedMaterial = ref<Material>({
    name: "",
    min_quantity: 0,
    quantity: 0,
    unit: "",
    price_per_unit: 0
  })
  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedMaterial.value = {
        name: "",
        min_quantity: 0,
        quantity: 0,
        unit: "",
        price_per_unit: 0
      };
    }
  });

  async function getMaterials() {
    loadingStore.isLoading = true
    try {
      const res = await materialService.getMaterials()
      materials.value = res.data
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถดึงข้อมูล Material ได้')
    }
    loadingStore.isLoading = false
  }
  async function saveMaterial() {
    loadingStore.isLoading = true
    try {
      if (editedMaterial.value.id) {
        await materialService.updateMaterial(editedMaterial.value.id, editedMaterial.value)
      } else {

        const res = await materialService.saveMaterial(editedMaterial.value)
      }

      dialog.value = false
      await getMaterials()
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถบันทึกข้อมูล Material ได้')
    }
    loadingStore.isLoading = false
  }

  function editMaterial(material: Material) {
    editedMaterial.value = JSON.parse(JSON.stringify(material))
    dialog.value = true
  }
  async function deleteMaterial(id: string) {
    loadingStore.isLoading = true
    try {
      await materialService.deleteMaterial(id)
      await getMaterials()
    } catch (e) {
      console.log(e)
      messageStore.showError('ไม่สามารถลบข้อมูล Material ได้')
    }
    loadingStore.isLoading = false
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
    loadingStore.isLoading = true
    for (let i = 0; i < selected.value.length; i++) {
      await materialService.deleteMaterial(selected.value[i])
      await getMaterials()
    }
    loadingStore.isLoading = false
  }
  return {
    materials,
    getMaterials,
    dialog,
    editMaterial,
    editedMaterial,
    saveMaterial,
    deleteMaterial,
    deleteMaterials,
    selectMaterial,
    selectMaterialAll,
    allSelected,
    selected,
    search,
    dialog2
  }
})
