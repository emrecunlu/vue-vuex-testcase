import request, { type ApiResult } from "@/utils/request";
import type {
  SalesResponse,
  SkuListResponse,
  SkuRefundRate,
} from "@/utils/types/sales";
import type { AxiosResponse } from "axios";

export type DailySalesDto = {
  marketplace: string;
  sellerId: string;
  requestStatus: number;
  day: number;
  excluedYoYData: boolean;
};

export type DailySaleSkuDto = {
  marketplace: string;
  sellerId: string;
  salesDate: string;
  salesDate2?: string;
  pageSize: number;
  pageNumber: number;
  isDaysCompare: number;
};

export type SkuRefunRateDto = {
  marketplace: string;
  sellerId: string;
  skuList: string[];
  requestedDay: number;
};

export const getDailySales = (data: DailySalesDto) => {
  return request.post<DailySalesDto, AxiosResponse<ApiResult<SalesResponse>>>(
    "/data/daily-sales-overview",
    data,
    { bearer: true }
  );
};

export const getDailySalesSkuList = (data: DailySaleSkuDto) => {
  return request.post<
    DailySaleSkuDto,
    AxiosResponse<ApiResult<SkuListResponse>>
  >("/data/daily-sales-sku-list", data);
};

export const getSkuRefundRate = (data: SkuRefunRateDto) => {
  return request.post<
    SkuRefunRateDto,
    AxiosResponse<ApiResult<SkuRefundRate[]>>
  >("/data/get-sku-refund-rate", data);
};
