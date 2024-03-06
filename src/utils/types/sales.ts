export type Sale = {
  fbaAmount: number;
  fbmAmount: number;
  date: string;
  profit: number;
  fbaShippingAmount: true;
};

export type SaleInformation = {
  Currency: string;
  isYoyExists: boolean;
};

export type SalesResponse = {
  item: Sale[];
} & SaleInformation;

export type SkuInformations = {
  selectedDate: string;
  selectedDate2?: string;
  totalSale: string;
  totalSale2?: string;
  totalShippingAmount: number;
  totalShippingAmount2?: number;
};

export type SkuListResponse = {
  item: {
    skuList: SaleSku[];
  } & SkuInformations;
} & Pick<SaleInformation, "Currency">;

export type SaleSku = {
  asin: string;
  sku: string;
  productName: string;
  qty: number;
  amount: number;
  shippingAmount: number;
  qty2: number;
  amount2: number;
  shippingAmount2: number;
  sortingAmount: number;
  imageUrl: string;
  refundPercantage: any;
};

export type SkuRefundRate = {
  sku: string;
  refundAmount: number;
  refundQuantity: number;
  refundRate: number;
  totalOrderCount: number;
};

export type SaleSkuWithRefundRate = SaleSku & Pick<SkuRefundRate, "refundRate">;

export type SkuListResponseWithRefundRates = {
  item: {
    skuList: SaleSkuWithRefundRate[];
  };
} & SkuListResponse;
