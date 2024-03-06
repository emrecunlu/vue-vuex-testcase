import axios from "axios";
import { STORAGE_KEYS, getLocalStorage } from "./helpers";
import type { JwtToken } from "./types/auth";

export type ApiResult<T = unknown> = {
  ApiStatus: boolean;
  ApiStatusCode: number;
  ApiStatusMessage: string;
  Data: T | null;
};

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

request.interceptors.request.use(
  (config) => {
    const tokens = getLocalStorage<JwtToken>(STORAGE_KEYS.token);

    if (tokens) {
      config.headers["Authorization"] = `Bearer ${tokens.AccessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
