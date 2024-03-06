<script setup lang="ts">
import { useField } from "vee-validate";

type Props = {
  name: string;
  type?: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <label :for="$props.name" class="flex flex-col space-y-2">
    <input
      :type="$props.type ?? 'text'"
      v-model="value"
      :name="$props.name"
      :id="$props.name"
      v-bind="$attrs"
      class="h-10 border boder-zinc-100 px-4 rounded border-zinc-300 text-[15px]"
    />
    <template v-if="!!errorMessage">
      <span class="ml-4 text-sm text-rose-600">{{ errorMessage }}</span>
    </template>
  </label>
</template>
