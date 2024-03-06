<script setup lang="ts">
import { onMounted, ref } from "vue";
import DayFilter from "../DayFilter.vue";
import { getDailySales, type DailySalesDto } from "@/services/sales";
import type { Sale } from "@/utils/types/sales";
import SalesChart from "./SalesChart.vue";
import SalesSkuTable from "./SalesSkuTable.vue";

type Props = {
  sellerId: string;
  markeplaceName: string;
};

const props = defineProps<Props>();

const loading = ref<boolean>(false);
const currency = ref<string>("");
const items = ref<Sale[]>([]);
const dates = ref<string[]>([]);
const selectedDay = ref<number>(30);

const getDailySalesData = (day: number) => {
  loading.value = true;

  getDailySales({
    day,
    excluedYoYData: true,
    marketplace: props.markeplaceName,
    sellerId: props.sellerId,
    requestStatus: 0,
  })
    .then((response) => {
      const result = response.data;

      currency.value = result.Data?.Currency as string;
      items.value = result.Data?.item as Sale[];
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleUpdateDay = (day: number) => {
  selectedDay.value = day;
  dates.value = [];

  getDailySalesData(day);
};

onMounted(() => {
  getDailySalesData(selectedDay.value);
});
</script>
<template>
  <div class="flex flex-col space-y-6">
    <div
      class="flex flex-col space-y-8 bg-white rounded-md border border-zinc-200 p-6"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-zinc-700 text-lg font-medium pl-8">Daily Sales</h1>
        <DayFilter
          v-model="selectedDay"
          :days="[60, 30, 14, 7]"
          @update:model-value="handleUpdateDay"
        />
      </div>

      <SalesChart
        :sales="items"
        :currency="currency"
        v-model:dates="dates"
        @clear="dates = []"
        @select="dates.push($event)"
        @unslect="dates = dates.filter((x) => x !== $event)"
        :loading="loading"
      />
    </div>

    <SalesSkuTable
      :sales-date="dates[0]"
      :sales-date2="dates?.[1]"
      :markeplace="props.markeplaceName"
      :seller-id="props.sellerId"
      :requested-day="selectedDay"
      v-if="dates.length > 0"
    />
  </div>
</template>
