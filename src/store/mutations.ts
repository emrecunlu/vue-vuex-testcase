import type { MutationTree } from "vuex";
import type { State } from "./state";
import type { User } from "@/utils/types/user";
import type { JwtToken, JwtTokenWithEmail } from "@/utils/types/auth";

export enum MutationType {
  SetUser = "SET_USER",
  SetTokens = "SET_TOKENS",
}

export type Mutations = {
  [MutationType.SetUser](state: State, user: User | null): void;
  [MutationType.SetTokens](
    state: State,
    tokens: JwtTokenWithEmail | null
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetUser](state, user) {
    state.user = user;
  },
  [MutationType.SetTokens](state, tokens) {
    state.tokens = tokens;
  },
};
