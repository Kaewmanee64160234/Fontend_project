import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type CheckMaterial from "./types/checkmaterial";
import checkmaterialService from '@/services/checkmaterial'
import { useMessageStore } from "./message";
import { useLoadingStore } from "./loading";
import type CheckMaterialDetail from "./types/checkmaterialdetail";

export const useCheckMaterialStore = defineStore("checkmaterail", () => {
  const checkmeterials = ref<CheckMaterial[]>([])
  const checkmeterialDetail = ref<CheckMaterialDetail[]>([])
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore();
  const checkMaterial = ref<CheckMaterial>({
    employeeId: 0,
    date: new Date(),
    time: new Date(),
  })


  // about pagination
  const page = ref(1)
  const take = ref(5)
  const keyword = ref('')
  const order = ref('ASC')
  const orderBy = ref('')
  const lastPage = ref(0)

  watch(page, async (newPage, oldPage) => {
    await getOneCheckMatrial(keyword.value)
  })
  watch(keyword, async (newKey, oldKey) => {
    if(keyword.value.length >=3){
      await getOneCheckMatrial(keyword.value)
    }if(keyword.value.length ===0){
      await getOneCheckMatrial(keyword.value)
  
    }
  })
  watch(lastPage, async (newlastPage, oldlastPage) => {
    if (newlastPage < page.value) {
      page.value = 1
    }
  })
  
  const getCheckMaterail = async () => {
    loadingStore.isLoading = true
    try {
      const response = await checkmaterialService.getCheckMaterail()
      checkmeterials.value = response.data.data

    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถดึงข้อมูลได้");

    }

    loadingStore.isLoading = false
  }
  const getOneCheckMatrial = async (id: string) => {
    loadingStore.isLoading = true
    try {
      console.log(page.value)
      const response = await checkmaterialService.getOneCheckMaterail(id);
      console.log(response.data)
      checkmeterialDetail.value = response.data
      console.log(checkmeterialDetail.value)
    } catch (err) {
      console.log(err)
      messageStore.showError("ไม่สามารถดึงข้อมูลได้");

    }

    loadingStore.isLoading = false
  }
  return {
    page,
    keyword,
    take,
    order,
    orderBy,
    lastPage, checkMaterial, getCheckMaterail, checkmeterials, getOneCheckMatrial, checkmeterialDetail
  };

});