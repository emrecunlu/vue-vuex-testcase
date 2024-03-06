<script lang="ts" setup>
import SalesDashboard from "@/components/dashboard/sales/SalesDashboard.vue";
import { useStore } from "@/store";

const store = useStore();

const user = store.getters.getUserInformation;
</script>

<template>
  <template v-if="user?.store && user.store.length > 0">
    <SalesDashboard
      v-for="userStore in user.store"
      :key="userStore.storeId"
      :seller-id="userStore.storeId"
      :markeplace-name="userStore.marketplaceName"
    />
  </template>
</template>
