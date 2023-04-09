import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type Store from './types/store.type';
import axios from 'axios';
import storeService from '@/services/store'
import { useLoadingStore } from '@/store/loading';
import { useMessageStore } from './message';
import ReportService from '@/services/report';
import type { Report_ } from './types/report.type';
export const useReport = defineStore('report', () => {
    const messageStore = useLoadingStore();
    const report = ref([]);
    const dataValueE = ref<number[]>([]);
    const dataValueS = ref<number[]>([]);
    
   
    const getReport = async ()=>{
        messageStore.isLoading = true;
        const res =  await ReportService.getReport();
        console.log(res.data);
      report.value =res.data;
        
        dataValueE.value = [parseInt(report.value[0]+''), parseInt(report.value[1]+''),parseInt(report.value[2]),parseInt(report.value[3]),parseInt(report.value[4]),parseInt(report.value[5]),parseInt(report.value[6])]
        // dataValueE.value = [parseInt(report.value[7]+''), parseInt(report.value[8]+''),parseInt(report.value[9]),parseInt(report.value[10]),parseInt(report.value[11]),parseInt(report.value[12]),parseInt(report.value[13])]
// console.log(report.value);
        // console.log(dataValueE);
        // console.log(dataValueS);
        messageStore.isLoading = false;
       
    }

    return{
        getReport,
        report,
        dataValueE,
        dataValueS
    }
})