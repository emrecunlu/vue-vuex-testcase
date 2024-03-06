import request, { type ApiResult } from "@/utils/request";
import type { UserInformation } from "@/utils/types/user";
import type { AxiosResponse } from "axios";

export type GetUserInformationDto = {
  email: string;
};

export const getUserInformation = (data: GetUserInformationDto) => {
  return request.post<
    GetUserInformationDto,
    AxiosResponse<ApiResult<UserInformation>>
  >("/user/user-information", { email: data.email });
};

export const logout = () => {
  return request.post("/user/logout", null, { bearer: true });
};
