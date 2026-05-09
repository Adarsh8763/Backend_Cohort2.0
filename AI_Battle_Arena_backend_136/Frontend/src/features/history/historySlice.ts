// ============================================================
// HISTORY SLICE
// ============================================================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BattleRecord } from '@shared/types';

interface HistoryState {
  records: BattleRecord[];
  searchQuery: string;
  selectedId: string | null;
}

const initialState: HistoryState = {
  records: [],
  searchQuery: '',
  selectedId: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addRecord(state, action: PayloadAction<BattleRecord>) {
      state.records.unshift(action.payload);
    },
    togglePin(state, action: PayloadAction<string>) {
      const record = state.records.find((r) => r.id === action.payload);
      if (record) record.isPinned = !record.isPinned;
    },
    deleteRecord(state, action: PayloadAction<string>) {
      state.records = state.records.filter((r) => r.id !== action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedId(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    setRecords(state, action: PayloadAction<BattleRecord[]>) {
      state.records = action.payload;
    },
  },
});

export const {
  addRecord,
  togglePin,
  deleteRecord,
  setSearchQuery,
  setSelectedId,
  setRecords,
} = historySlice.actions;

export default historySlice.reducer;
