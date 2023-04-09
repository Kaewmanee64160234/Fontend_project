<script setup lang="ts">
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ref} from 'vue'
Chart.register(...registerables)

const props = defineProps<{
  dataValues: number[];
  dataLabels: string[];
  label: String;
  color: String;
  dataValues2: number[];
  dataLabels2: string[];
  label2: String;
  color2: String;
  dataValues3: number[];
  dataLabels3: string[];
  label3: String;
  color3: String;
}>();
const options = {
  responsive: true,
  maintainAspectRatio: false,
  

}

const data = ref({
  labels: props.dataLabels,
  datasets: [
    {
      label: props.label,
      data: props.dataValues,
      tension: 0.4,
      borderColor: props.color,
      pointStyle: 'circle',
      pointBackgroundColor:  props.color,
      pointRadius: 5,
      pointHoverRadius: 8,
      
    },{
      label: props.label2,
      data: props.dataValues2,
      tension: 0.4,
      borderColor: props.color2,
      pointBackgroundColor:  props.color2,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 8,
    },{
      label: props.label3,
      data: props.dataValues3,
      tension: 0.4,
      borderColor: props.color3,
      pointBackgroundColor:  props.color3,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 8,
    }
  ],
  
 
}

)
</script>

<template>
  
  <div>
    <LineChart :chart-data="data" :options="options" ></LineChart>
  </div>
</template>