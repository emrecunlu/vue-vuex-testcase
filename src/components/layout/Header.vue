<script setup lang="ts">
import { logout } from "@/services/user";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = store.getters["getUserInformation"];

const handleLogout = () => {
  logout().then(() => {
    store.dispatch(ActionTypes.UserLogout);

    router.push({ name: "Login" });
  });
};
</script>

<template>
  <header class="h-14 flex items-center justify-between border-b px-6 bg-white">
    <RouterLink
      class="text-lg hover:text-zinc-600 transition-colors1"
      :to="{ name: 'Dashboard' }"
    >
      {{ user?.firstName }} {{ user?.lastName }}</RouterLink
    >

    <button
      class="w-10 h-10 rounded-full border hover:bg-zinc-200 transition-colors flex items-center justify-center"
      @click.stop="handleLogout"
    >
      <VIcon name="md-logout" class="text-zinc-900 size-4" />
    </button>
  </header>
</template>
