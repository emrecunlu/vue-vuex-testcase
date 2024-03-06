<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useForm } from "vee-validate";
import TextField from "@/components/TextField.vue";
import { getOAuthToken, type OAuthTokenDto } from "@/services/oauth";
import { useRouter } from "vue-router";
import type { JwtToken } from "@/utils/types/auth";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { ref } from "vue";

const router = useRouter();
const store = useStore();

const loading = ref<boolean>(false);

const { handleSubmit, meta } = useForm<{ email: string; password: string }>({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email(),
      password: z.string().min(3),
    })
  ),
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  const data: OAuthTokenDto = {
    Email: values.email,
    Password: values.password,
    ClientId: "C0001",
    ClientSecret: "SECRET0001",
    GrantType: "password",
    Scope: "amazon_data",
    RedirectUri: import.meta.env.VITE_REDIRECT_URI ?? "",
  };

  loading.value = true;

  getOAuthToken(data)
    .then(async (response) => {
      if (response.data.ApiStatusCode === 200) {
        const tokens = response.data.Data as JwtToken;

        store.dispatch(ActionTypes.SignIn, { ...tokens, Email: values.email });

        router.push({ name: "Dashboard" });
      }
    })
    .finally(() => (loading.value = false));
});
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center bg-zinc-50 p-4 2xl:p-0"
  >
    <div
      class="w-full max-w-2xl rounded shadow-sm border border-zinc-200 bg-white p-8"
    >
      <div class="flex space-x-4">
        <div
          class="w-14 h-14 rounded-full bg-zinc-600 flex items-center justify-center"
        >
          <VIcon name="md-assignmentind" class="text-zinc-50 size-8" />
        </div>
        <div class="flex flex-col">
          <h1 class="text-zinc-900 font-medium">Sign in</h1>
          <span class="my-auto text-sm text-zinc-400"
            >Please fill out the form to sign in</span
          >
        </div>
      </div>

      <form @submit="onSubmit" class="space-y-8 mt-12">
        <TextField name="email" placeholder="john.doe@eva.guru" />
        <TextField
          name="password"
          type="password"
          placeholder="******"
          autocomplete="on"
        />

        <button
          :disabled="(!meta.valid && meta.touched) || loading"
          type="submit"
          class="flex ml-auto items-center bg-zinc-600 text-white px-6 py-2 rounded-md text-[15px] hover:bg-zinc-500 transition-colors disabled:bg-zinc-400"
        >
          <template v-if="loading">Loading...</template>
          <template v-else
            >Sign in <VIcon name="md-login" class="ml-2"
          /></template>
        </button>
      </form>
    </div>
  </div>
</template>
