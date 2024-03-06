import { AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    bearer?: boolean;
  }
}
