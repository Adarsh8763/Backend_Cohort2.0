// ============================================================
// BATTLE API — RTK Query service layer
// ============================================================
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BattleState } from '@shared/types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const battleApi = createApi({
  reducerPath: 'battleApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Battle'],
  endpoints: (builder) => ({
    // POST /battle — start a new battle, returns full result
    startBattle: builder.mutation<BattleState, { problem: string }>({
      query: (body) => ({
        url: '/use-graph',
        method: 'POST',
        body,
      }),
      
      transformResponse: (response: {
        message: string;
        result: BattleState;
      }) => response.result,

      invalidatesTags: ['Battle'],
    }),
    // GET /battle/history — list past battles
    getBattleHistory: builder.query<BattleState[], void>({
      query: () => '/battle/history',
      providesTags: ['Battle'],
    }),
    // GET /battle/:id — single battle result
    getBattleById: builder.query<BattleState, string>({
      query: (id) => `/battle/${id}`,
      providesTags: ['Battle'],
    }),
  }),
});

export const {
  useStartBattleMutation,
  useGetBattleHistoryQuery,
  useGetBattleByIdQuery,
} = battleApi;
