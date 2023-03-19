import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type Store from './types/store.type';
import axios from 'axios';
import storeService from '@/services/store'
import { useLoadingStore } from '@/store/loading';
import { useMessageStore } from './message';

export const useStoreStore = defineStore('Store', () => {
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const stores = ref<Store[]>([]);
  const selected = ref<string[] | any[]>([])
  const allSelected = ref(false)
  const loadingStore = useLoadingStore();
  const search = ref('');
  const editedStore = ref<Store>({name:"", address: "", tel: ""});

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if(!newDialog){
      editedStore.value = {name:"", address: "", tel: ""};
    }
  })

 
  
  async function getStores() {
    loadingStore.isLoading = true;
    try {
      const res = await storeService.getStores();
      stores.value = res.data.data
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Stores ได้");
    }
    loadingStore.isLoading = false;
  }
  const saveStore = async ()=>{
    loadingStore.isLoading = true;
    try{
      if(editedStore.value.id){
        const res = await storeService.updateStore(editedStore.value.id, editedStore.value);

      }else{
        const res = await storeService.saveStore(editedStore.value);
      }
      dialog.value = false;
      await getStores();
    }catch(e){
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึกข้อมูล Stores ได้");
    }
    loadingStore.isLoading = false;
  }
  async function deleteStore(id:number){
    loadingStore.isLoading = true;
    try{ 
        const res = await storeService.deleteStore(id);
        await getStores();
    }catch(e){
      console.log(e);
      messageStore.showError("ไม่สามารถลบข้อมูล Stores ได้");
    }
    loadingStore.isLoading = false;
  }
  function editStore(store:Store){
    editedStore.value = JSON.parse(JSON.stringify(store));
    dialog.value = true;
  }
  
  function selectStoreAll() {
    if (!allSelected.value) {
      selected.value = stores.value.map((store) => store.id + '')
    }
  }
  function selectStore()  {
    allSelected.value = false
  }
  const deleteAllStore = async () => {
    for (let i = 0; i < selected.value.length; i++) {
      await storeService.deleteStore(selected.value[i])
    }
    await getStores()
  }


  return { stores, getStores, dialog, saveStore, deleteStore, editStore, editedStore, selectStoreAll, selectStore, allSelected, selected, deleteAllStore, search }
})
