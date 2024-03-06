<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Loader from "@/components/Loader.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { computed, onMounted } from "vue";

const store = useStore();

const user = computed(() => store.getters.getUserInformation);
const email = store.getters.getTokens?.Email;

onMounted(() => {
  store.dispatch(ActionTypes.GetUserInformation, { email: email as string });
});
</script>

<template>
  <template v-if="!user">
    <Loader />
  </template>
  <template v-else>
    <div class="h-full flex flex-col bg-zinc-50">
      <Header />
      <main class="p-4">
        <RouterView></RouterView>
      </main>
    </div>
  </template>
</template>
