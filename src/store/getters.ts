import type { User } from "@/utils/types/user";
import type { GetterTree } from "vuex";
import type { State } from "./state";
import type { JwtTokenWithEmail } from "@/utils/types/auth";

export type Getters = {
  getUserInformation(state: State): User | null;
  isLoggedIn(state: State): boolean;
  getTokens(state: State): JwtTokenWithEmail | null;
};

export const getters: GetterTree<State, State> & Getters = {
  getUserInformation(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return !!state.tokens;
  },
  getTokens(state) {
    return state.tokens;
  },
};
