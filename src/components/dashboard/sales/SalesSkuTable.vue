<script setup lang="ts">
import Pagination from "@/components/Pagination.vue";
import Spinner from "@/components/Spinner.vue";
import { getDailySalesSkuList, getSkuRefundRate } from "@/services/sales";
import type {
  SaleSku,
  SaleSkuWithRefundRate,
  SkuInformations,
} from "@/utils/types/sales";
import { computed, onMounted, ref, toRefs, watch } from "vue";

type Props = {
  salesDate: string;
  salesDate2?: string;
  markeplace: string;
  sellerId: string;
  requestedDay: number;
};

const loading = ref<boolean>(true);
const skuInformations = ref<SkuInformations | null>(null);
const data = ref<SaleSkuWithRefundRate[]>([]);
const currency = ref<string>("");
const pageNumber = ref<number>(1);
const pageSize = ref<number>(30);
const page = ref<number>(1);
const pageOfContents = 10;

const props = defineProps<Props>();
const { salesDate, salesDate2 } = toRefs(props);

const loadItems = () => {
  loading.value = true;

  getDailySalesSkuList({
    isDaysCompare: Number(!!salesDate2.value),
    marketplace: props.markeplace,
    pageNumber: pageNumber.value,
    pageSize: pageSize.value,
    salesDate: props.salesDate,
    salesDate2: salesDate2.value,
    sellerId: props.sellerId,
  })
    .then(async ({ data: result }) => {
      if (result.Data?.item.skuList && result.Data.item.skuList.length > 0) {
        const skuArr: string[] =
          result.Data?.item.skuList.map((x) => x.sku) ?? [];

        const { data: refundResult } = await getSkuRefundRate({
          marketplace: props.markeplace,
          requestedDay: props.requestedDay,
          sellerId: props.sellerId,
          skuList: skuArr,
        });

        const refundList = refundResult.Data;

        const { skuList, ...rest } = result.Data!.item;

        const newData =
          skuList!.map((sale) => ({
            ...sale,
            refundRate:
              refundList?.find((refund) => refund.sku === sale.sku)
                ?.refundRate ?? 0,
          })) ?? [];

        currency.value = result.Data?.Currency ?? "";
        data.value = [...data.value, ...newData];
        skuInformations.value = rest;
      }
    })

    .finally(() => (loading.value = false));
};

const paginatedData = computed(() =>
  data.value.slice(
    (page.value - 1) * pageOfContents,
    page.value * pageOfContents
  )
);

const nextPage = () => {
  if (pageOfContents * page.value < data.value.length) {
    page.value += 1;
  } else {
    pageNumber.value += 1;
  }
};

watch([salesDate, salesDate2], () => {
  page.value = 1;
  loadItems();
});

watch(pageNumber, () => {
  loadItems();
});

onMounted(() => {
  loadItems();
});
</script>

<template>
  <div class="w-full border border-zinc-200 rounded-md bg-white">
    <div v-if="loading" class="h-64 flex items-center justify-center">
      <Spinner />
    </div>
    <div v-else>
      <div class="w-full relative overflow-x-auto">
        <table class="w-full table-auto">
          <thead class="bg-white table-auto">
            <tr>
              <th
                class="text-left text-sm text-zinc-600 font-semibold px-4 py-2"
              >
                SKU
              </th>
              <th
                class="text-left text-sm text-zinc-600 font-semibold px-4 py-2"
              >
                Product Name
              </th>
              <th
                v-if="skuInformations?.selectedDate2"
                class="text-right text-[12px] text-zinc-600 font-semibold leading-normal px-4 py-2"
              >
                <div class="flex flex-col">
                  <span>{{ skuInformations.selectedDate2 }}</span>
                  <span>Sales / Units</span>
                  <span>Avg. Selling Price</span>
                </div>
              </th>
              <th
                class="text-right text-[12px] text-zinc-600 font-semibold leading-normal px-4 py-2"
              >
                <div class="flex flex-col">
                  <span>{{ skuInformations?.selectedDate ?? "" }}</span>
                  <span>Sales / Units</span>
                  <span>Avg. Selling Price</span>
                </div>
              </th>
              <th
                class="text-right text-zinc-600 font-semibold text-[12px] leading-normal px-4 py-2"
              >
                <div class="flex flex-col">
                  <span>SKU Refund Rate</span>
                  <span>(Last 60 days)</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedData"
              :key="item.sku"
              class="odd:bg-zinc-100 hover:bg-zinc-100"
            >
              <td
                class="px-4 py-3 hover:bg-zinc-100 text-zinc-600 text-sm font-semibold"
              >
                {{ item.sku }}
              </td>
              <td class="text-[12px] text-zinc-600 font-semibold px-4 py-3">
                {{ item.productName }}
              </td>
              <td
                class="text-right px-4 py-3 text-[12px] font-semibold text-zinc-600"
                v-if="skuInformations?.selectedDate2"
              >
                <div>
                  C{{ `${currency}${item.amount2.toFixed(2)}` }}
                  /
                  {{ item.qty2 }}
                </div>
                <div>
                  {{
                    item.qty2 > 0
                      ? `C${currency}${(item.amount2 / item.qty2).toFixed(2)}`
                      : "-"
                  }}
                </div>
              </td>
              <td
                class="text-right px-4 py-3 text-[12px] font-semibold text-zinc-600"
              >
                <div>
                  C{{ `${currency}${item.amount.toFixed(2)}` }} /
                  {{ item.qty }}
                </div>
                <div>
                  {{
                    item.qty > 0
                      ? `C${currency}${(item.amount / item.qty).toFixed(2)}`
                      : "-"
                  }}
                </div>
              </td>
              <td
                class="text-right px-4 py-3 text-[12px] font-semibold text-zinc-600"
              >
                {{ item.refundRate + "%" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-end p-4 w-full">
        <Pagination :page="page" @next="nextPage" @prev="page -= 1" />
      </div>
    </div>
  </div>
</template>
