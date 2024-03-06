<script setup lang="ts">
import type { Sale } from "@/utils/types/sales";
import { computed, ref, toRefs } from "vue";
import { Chart } from "highcharts-vue";
import Spinner from "@/components/Spinner.vue";

type Props = {
  sales: Sale[];
  currency: string;
  loading: boolean;
  dates: string[];
};

type Emits = {
  (e: "select", value: string): void;
  (e: "unslect", value: string): void;
  (e: "clear"): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const chartConfig = computed(() => ({
  chart: {
    type: "column",
    borderRadius: 0,
    events: {
      load: function () {
        emits("clear");
      },
    },
  },
  height: 300,
  xAxis: {
    categories: props.sales.map((sale) => sale.date),
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: `Amount (${props.currency})`,
    },
    stackLabels: {
      enabled: true,
      format: `${props.currency}{total}`,
    },
  },
  colors: ["#eab308", "#2563eb", "#4f46e5"],
  title: {
    text: "",
  },
  plotOptions: {
    column: {
      stacking: "normal",
      borderWidth: 0,
      borderRadius: 3,
      centerInCategory: true,
    },
    series: {
      cursor: "pointer",
      allowPointSelect: true,
      states: {
        select: {
          color: "#4ade80",
        },
      },
      point: {
        events: {
          select: function (event: any): boolean {
            const date = event.target.category;

            if (props.dates.length < 2) {
              emits("select", date);

              return true;
            }

            return false;
          },
          unselect: function (event: any): boolean {
            const date = event.target.category;

            emits("unslect", date);

            return true;
          },
        },
      },
    },
  },
  tooltip: {
    shared: true,
    exporting: false,
  },
  series: [
    { name: "Profit", data: props.sales.map((sale) => sale.profit) },
    { name: "FBA Sales", data: props.sales.map((sale) => sale.fbaAmount) },
    { name: "FBM Sales", data: props.sales.map((sale) => sale.fbmAmount) },
  ],
}));
</script>

<template>
  <template v-if="loading">
    <div class="flex items-center justify-center w-full h-[300px]">
      <Spinner />
    </div>
  </template>
  <template v-else>
    <Chart :options="chartConfig" />
  </template>
</template>
