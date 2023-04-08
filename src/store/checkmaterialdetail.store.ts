import { defineStore } from "pinia";
import { ref } from "vue";
import type CheckMaterialDetail
 from "./types/checkmaterialdetail";
 import checkmaterialdetailService from '@/services/checkmaterialdetail'
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useCheckMaterailDetailStore = defineStore("checkmaterialdetail", () => {
    const CheckMaterialDetails = ref<CheckMaterialDetail[]>([]);
    const loadingStore = useLoadingStore()
    const messageStore = useMessageStore();
    const CheckMaterialDetail = ref<CheckMaterialDetail>({
        materialId: 1,
        checkmaterialID: 1,
        name: '',
        qty_last: 0,
        qty_remain: 0,
        qty_expire: 0,
      })
      const getCheckMaterailDetail = async () => {
        loadingStore.isLoading = true
        try {
          const response = await checkmaterialdetailService.getCheckMaterailDetail()
          CheckMaterialDetails.value = response.data
        } catch (err) {
          console.log(err)
          messageStore.showError("Oops!, cannot get details.");
    
        }
    
        loadingStore.isLoading = false
      }
      const getOneCheckMatrialDetail = async (id: string) => {
        loadingStore.isLoading = true
        try {
          const response = await checkmaterialdetailService.getOneCheckMaterailDetail(id);
          CheckMaterialDetail.value = response.data
          console.log(CheckMaterialDetail.value)
        } catch (err) {
          console.log(err)
          messageStore.showError("Oops!, cannot get details.");
    
        }
    
        loadingStore.isLoading = false
      }
    return { CheckMaterialDetail, getCheckMaterailDetail, CheckMaterialDetails, getOneCheckMatrialDetail };  
  });