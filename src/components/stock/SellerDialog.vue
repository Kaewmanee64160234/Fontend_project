<script lang='ts'>
import { computed, defineComponent, ref } from "vue";
// import {shuffle} from "lo"
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, registerables, type ChartData, type ChartOptions } from "chart.js";

Chart.register(...registerables);
export default defineComponent({
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { DoughnutChart },
  setup() {
    const dataValues = ref([17, 24, 10, 30,50]);
    const dataLabels = ref(["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"]);
    const toggleLegend = ref(true);
    
    const testData = computed<ChartData<"doughnut">>(() => ({
      labels: dataLabels.value,
      // datasets: [
      //   {
      //     data: [50,60,70,180,190],
      //     backgroundColor: [
      //       "#BBD6B8",
      //       "#AEC2B6",
      //       "#94AF9F",
      //       "#DBE4C6",
      //       "#CDE990"
            
      //     ],
      //   },
      // ],
      datasets: [
      {
        data: [10, 20, 15, 5, 50],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
      },
    ],
    }));

    const options = computed<ChartOptions<"doughnut">>(() => ({
      scales: {
        myScale: {
          type: "logarithmic",
          position: toggleLegend.value ? "left" : "right",
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    }));

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    });

    let index = ref(10);

    function shuffleData() {
      // dataValues.value = shuffle(dataValues.value);
      dataValues.value.push(index.value);
      dataLabels.value.push("Other" + index.value);
      console.log(dataValues.value);
      console.log(doughnutChartRef.value!.chartInstance);
      index.value++;
    }

    function switchLegend() {
      toggleLegend.value = !toggleLegend.value;
    }

    return {
      shuffleData,
      switchLegend,
      testData,
      options,
      doughnutChartRef,
      doughnutChartProps,
    };
  },
});
</script>

<template>
  <div style="width: 400px">
    <div style="display: flex; justify-content: center">
      <button type="button" @click="shuffleData">Add data</button>
      <button type="button" @click="switchLegend">Swicth legends</button>
    </div>
    <DoughnutChart v-bind="doughnutChartProps" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
