import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type CheckMaterial from "./types/checkmaterial";
 import checkmaterialService from '@/services/checkmaterial'
import { useMessageStore } from "./message";
import { useLoadingStore } from "./loading";

export const useCheckMaterialStore = defineStore("checkmaterail", () => {
 const checkmeterials = ref<CheckMaterial[]>([])
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore();
    const checkMaterial = ref<CheckMaterial>({
        employeeId: 0,
        date: new Date(),
        time: new Date(),
      })

      const getCheckMaterail = async () => {
        loadingStore.isLoading = true
        try {
          const response = await checkmaterialService.getCheckMaterail()
          checkmeterials.value = response.data
        } catch (err) {
          console.log(err)
          messageStore.showError("ไม่สามารถดึงข้อมูลได้");
    
        }
    
        loadingStore.isLoading = false
      }
      const getOneCheckMatrial = async (id: string) => {
        loadingStore.isLoading = true
        try {
          const response = await checkmaterialService.getOneCheckMaterail(id);
          checkMaterial.value = response.data
          console.log(checkMaterial.value)
        } catch (err) {
          console.log(err)
          messageStore.showError("ไม่สามารถดึงข้อมูลได้");
    
        }
    
        loadingStore.isLoading = false
      }
    return {checkMaterial, getCheckMaterail, checkmeterials, getOneCheckMatrial};  
    
  });