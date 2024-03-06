import request, { type ApiResult } from "@/utils/request";
import type { JwtToken } from "@/utils/types/auth";
import type { AxiosResponse } from "axios";

export type OAuthTokenDto = {
  Email: string;
  Password: string;
  GrantType: string;
  Scope: string;
  ClientId: string;
  ClientSecret: string;
  RedirectUri: string;
};

export const getOAuthToken = (data: OAuthTokenDto) => {
  return request.post<OAuthTokenDto, AxiosResponse<ApiResult<JwtToken>>>(
    "/oauth/token",
    data
  );
};
