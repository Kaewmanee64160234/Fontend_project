import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import catagoryService from '@/services/catagory'
import { useLoadingStore } from '@/store/loading';
import { useMessageStore } from './message';
import type Catagory from './types/catagory';

export const useCatagoryStore = defineStore('Catagory', () => {
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const catagories = ref<Catagory[]>([]);
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const loadingStore = useLoadingStore();
  const search = ref('');
  const editedCatagory = ref<Catagory>({ name: "" });

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      editedCatagory.value = { name: "" };
    }
  })
  async function getCatagories() {
    loadingStore.isLoading = true;
    try {
      const res = await catagoryService.getCatagories();
      catagories.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showError("Ccannot get data categories");
    }
    loadingStore.isLoading = false;
  }
  const saveCatagory = async () => {
    loadingStore.isLoading = true;
    try {
      if (editedCatagory.value.id) {
        const res = await catagoryService.updateCatagory(editedCatagory.value.id, editedCatagory.value);

      } else {
        const res = await catagoryService.saveCatagory(editedCatagory.value);
      }
      dialog.value = false;
      await getCatagories();
    } catch (e) {
      console.log(e);
      messageStore.showError("Cannot save catagory");
    }
    loadingStore.isLoading = false;
  }
  async function deleteCatagory(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await catagoryService.deleteCatagory(id);
      await getCatagories();
    } catch (e) {
      console.log(e);
      messageStore.showError("Cannot delete catagory");
    }
    loadingStore.isLoading = false;
  }
  function editCatagory(catagory: Catagory) {
    editedCatagory.value = JSON.parse(JSON.stringify(catagory));
    dialog.value = true;
  }

  function selectCatagoryAll() {
    if (!allSelected.value) {
      selected.value = catagories.value.map((catagory) => catagory.id + '')
    }
  }
  function selectCatagory() {
    allSelected.value = false
  }
  const deleteAllCatagory = async () => {
    for (let i = 0; i < selected.value.length; i++) {
      await catagoryService.deleteCatagory(selected.value[i])
    }
    await getCatagories()
  }

  return { catagories, getCatagories, dialog, saveCatagory, deleteCatagory, editCatagory, editedCatagory, selectCatagoryAll, selectCatagory, allSelected, selected, deleteAllCatagory, search }
})
