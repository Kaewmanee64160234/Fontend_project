import { defineStore } from "pinia";
import { ref } from "vue";
import type Check_Material_Detail
 from "./types/checkmaterialdetail";
 import checkmaterialdetailService from '@/services/checkmaterialdetail'
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useCheckMaterailDetailStore = defineStore("checkmaterialdetail", () => {
    const CheckMaterialDetails = ref<Check_Material_Detail[]>([]);
    const loadingStore = useLoadingStore()
    const messageStore = useMessageStore();
    const CheckMaterialDetail = ref<Check_Material_Detail>({
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
          messageStore.showError("ไม่สามารถดึงข้อมูลได้");
    
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
          messageStore.showError("ไม่สามารถดึงข้อมูลได้");
    
        }
    
        loadingStore.isLoading = false
      }
    return { CheckMaterialDetail, getCheckMaterailDetail, CheckMaterialDetails, getOneCheckMatrialDetail };  
  });