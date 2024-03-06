<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { number } from "zod";

type Props = {
  modelValue: number;
  days: number[];
};

type Emits = {
  (e: "update:modelValue", value: number): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const handleUpdateModelValue = (day: number) => {
  if (day !== props.modelValue) {
    emits("update:modelValue", day);
  }
};
</script>

<template>
  <div class="relative w-48">
    <Listbox
      :model-value="props.modelValue"
      @update:model-value="handleUpdateModelValue"
    >
      <ListboxButton
        class="border border-zinc-200 bg-white py-2 text-[15px] text-zinc-600 font-medium w-full"
        >Last {{ props.modelValue }} Days</ListboxButton
      >
      <div class="absolute z-10 bg-white w-full">
        <ListboxOptions class="border mt-2">
          <ListboxOption
            class="py-2 text-center border-b hover:bg-zinc-100 cursor-pointer text-[15px] text-zinc-600 font-medium"
            v-for="day in props.days"
            :key="day"
            :value="day"
            >{{ day }} Day
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
