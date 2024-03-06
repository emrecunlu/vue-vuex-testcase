import { STORAGE_KEYS, getLocalStorage } from "@/utils/helpers";
import type { JwtToken, JwtTokenWithEmail } from "@/utils/types/auth";
import type { User } from "@/utils/types/user";

export type State = {
  user: User | null;
  tokens: JwtTokenWithEmail | null;
};

const tokens = getLocalStorage<JwtTokenWithEmail>(STORAGE_KEYS.token);

export const state: State = {
  user: null,
  tokens,
};
