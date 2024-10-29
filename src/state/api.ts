import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

enum Type {
  a ='Dragon 1.0',
  b='Dragon 1.1',
  c= 'Dragon 2.2'
}
export enum Status{
  Active = "active",
  Retired = "retired",
  Destroyed ="destroyed",
  Unknown ="unknown"
}
interface Mission{
  name: string;
  flight? :number;
}
export interface Capsules {
  capsule_serial? : string,
  capsule_id: string,
  status: Status,
  original_launch: string,
  original_launch_unix?: number,
  missions?: Mission[],
  landings?: number,
  type?: Type,
  details?: string,
  reuse_count?: number
}

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Capsules"],
  endpoints: (build) => ({
    getCapsules: build.query<Capsules[], string | void>({
      query: () => "/capsules",
      providesTags: ["Capsules"],
    }),

    searchCapsules: build.query<Capsules[], string | void>({
      query: (search) => `/capsules/${search}`,
      providesTags: (result, error, arg) => [{ type: "Capsules", id: arg ?? "LIST" },],
    }),
  }),
});

export const {
  useGetCapsulesQuery,
  useLazySearchCapsulesQuery,
} = api;
