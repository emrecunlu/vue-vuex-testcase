import type { ActionContext, ActionTree } from "vuex";
import type { State } from "./state";
import { MutationType, type Mutations } from "./mutations";
import {
  STORAGE_KEYS,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/helpers";
import {
  getUserInformation,
  type GetUserInformationDto,
} from "@/services/user";
import type { JwtTokenWithEmail } from "@/utils/types/auth";

export enum ActionTypes {
  UserLogout = "USER_LOGOUT",
  SignIn = "SIGN_IN",
  GetUserInformation = "GET_USER_INFORMATION",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.UserLogout](context: ActionAugments): void;
  [ActionTypes.SignIn](
    context: ActionAugments,
    payload: JwtTokenWithEmail
  ): void;
  [ActionTypes.GetUserInformation](
    context: ActionAugments,
    payload: GetUserInformationDto
  ): void;
};

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.UserLogout](context) {
    removeLocalStorage(STORAGE_KEYS.token);

    context.commit(MutationType.SetUser, null);
    context.commit(MutationType.SetTokens, null);
  },
  [ActionTypes.SignIn](context, payload) {
    setLocalStorage(STORAGE_KEYS.token, payload);

    context.commit(MutationType.SetTokens, payload);
  },
  [ActionTypes.GetUserInformation](context, payload) {
    getUserInformation(payload).then((response) => {
      const user = response.data.Data?.user;

      context.commit(MutationType.SetUser, user ?? null);
    });
  },
};
