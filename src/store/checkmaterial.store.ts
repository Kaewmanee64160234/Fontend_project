import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type CheckMaterial from "./types/checkmaterial";
import checkmaterialService from '@/services/checkmaterial'
import { useMessageStore } from "./message";
import { useLoadingStore } from "./loading";
import type CheckMaterialDetail from "./types/checkmaterialdetail";
import checkmaterial from "@/services/checkmaterial";
import type Employee from "./types/employee.type";
import checkmaterialdetail from "@/services/checkmaterialdetail";


export const useCheckMaterialStore = defineStore("checkmaterail", () => {
  const dialog = ref(false)
  const CheckMatDe = ref<CheckMaterialDetail[]>([{ id: 0, name: '', qty_expire: 0, qty_last: 0, qty_remain: 0, materialId: 0, checkmaterialID: 0 }]);
  const checkmeterials = ref<CheckMaterial[]>([{
    employeeId: 0,
    date: new Date(),
    time: new Date(),
    checkMaterialDetails: [{ id: 0, name: '', qty_expire: 0, qty_last: 0, qty_remain: 0, materialId: 0, checkmaterialID: 0 }]
  }])
  const checkmeterialDetail = ref<CheckMaterialDetail[]>([])
  const checkMatItem = ref<{
    id: number, name: string, qty_last: number, qty_remain: number, qty_expire: number, createdAt: Date, checkmaterial: { id: number, date: '', checkmaterialdetails: CheckMaterialDetail[] }
  }[]>()
  const loadingStore = useLoadingStore()
  const messageStore = useMessageStore();
  const checkMaterial = ref<CheckMaterial>({
    employeeId: 0,
    date: new Date(),
    time: new Date(),
    checkMaterialDetails: CheckMatDe.value
  })

  const data = ref(JSON.parse(JSON.stringify(localStorage.getItem('employee'))))
  const employee = ref<Employee>(JSON.parse(data.value))

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
    if (keyword.value.length >= 3) {
      await getOneCheckMatrial(keyword.value)
    } if (keyword.value.length === 0) {
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
      messageStore.showError("Oops!, cannot get check materials.");

    }

    loadingStore.isLoading = false
  }
  const getOneCheckMatrial = async (id: string) => {
    loadingStore.isLoading = true
    try {
      console.log(page.value)
      const response = await checkmaterialService.getOneCheckMaterail(id);
      console.log(response.data)
      checkMatItem.value = response.data
      console.log(checkMatItem.value)
    } catch (err) {
      console.log(err)
      messageStore.showError("Oops!, cannot get check meterials.");

    }

    loadingStore.isLoading = false
  }
  const saveCheckMat = async () => {
    loadingStore.isLoading = true;
    try {
      
      checkMaterial.value.employeeId = employee.value.id;
      console.log(JSON.stringify(checkMaterial.value))
      const res = await checkmaterialService.saveCheckMaterail(checkMaterial.value);
      console.log(res.data)
      dialog.value = false;
      await getCheckMaterail();

    } catch (e) {
      console.log(e);
      messageStore.showError("Cannot save check material");
    }
    loadingStore.isLoading = false;
  }
  const addCheckMatDetail = () => {
    const newdetail = ref<CheckMaterialDetail>({ id: 0, name: '', qty_expire: 0, qty_last: 0, qty_remain: 0, materialId: 0, checkmaterialID: 0 });
    CheckMatDe.value.push(newdetail.value);

  }


  return {
    page,
    keyword,
    take,
    order,
    orderBy,
    lastPage, checkMaterial, getCheckMaterail, checkmeterials, getOneCheckMatrial, checkmeterialDetail,checkMatItem, dialog,
  saveCheckMat, addCheckMatDetail, CheckMatDe

  };

});