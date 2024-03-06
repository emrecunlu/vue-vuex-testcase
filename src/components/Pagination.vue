<script setup lang="ts">
type Props = {
  page: number;
};

type Emits = {
  (e: "next", page: number): void;
  (e: "prev", page: number): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div
    class="flex items-center justify-between space-x-6 px-4 py-2 rounded-full bg-zinc-100"
  >
    <button
      :disabled="props.page <= 1"
      class="group"
      @click="emit('prev', props.page - 1)"
    >
      <VIcon
        name="md-chevronleft-round"
        class="group-[:disabled]:opacity-20 cursor-pointer"
      />
    </button>
    <span
      class="h-8 w-8 bg-zinc-600 rounded-full flex items-center justify-center text-gray-50 font-medium"
      >{{ props.page }}</span
    >

    <button @click="emit('next', props.page + 1)">
      <VIcon
        name="md-chevronright-round"
        class="group-[:disabled]:opacity-20 cursor-pointer"
      />
    </button>
  </div>
</template>
