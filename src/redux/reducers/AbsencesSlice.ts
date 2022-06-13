import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

interface Absence {
    admitterNote: string
    confirmedAt: any
    createdAt: string
    crewId: number
    endDate: string
    id: number
    memberNote: string
    rejectedAt: string
    startDate: string
    type: string
    userId: number
}

interface AbsencesState {
    items: Absence[],
    filteredItems: Absence[],
    status: 'loading' | 'success' | 'failed'
    filterBy: string,
    initial: number,
    final: number    
}

const initialState = {
    items: [],
    filteredItems: [],
    status: 'loading',
    filterBy: 'all',
    initial: 0,
    final: 10    
} as AbsencesState

export const fetchAbsences: any = createAsyncThunk(
    'absences/fetchAbsences',
    async () => {    
      const response = await fetch('http://localhost:9000/absences');
      if (response.ok) {
        const result = await response.json();      
        return result.absences.payload;
      } else {
        const error: any = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      }
    }
);

const absencesSlice = createSlice({
    name: 'absences',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAbsences.pending]: (state, action:PayloadAction) => {
            console.log('fetching absences...');
            state.status = "loading"
        },
        [fetchAbsences.fulfilled]: (state, action: PayloadAction<Absence[]>) => {
            console.log("Absences data fetched successfully");
            state.items = action.payload;
            state.filteredItems = action.payload.slice(state.initial, state.final)
            state.status = "success"
        },
        [fetchAbsences.rejected]: (state, action:PayloadAction) => {
            console.log('error fetching absences...');
            state.status = "failed"
        }
    }
})

export default absencesSlice.reducer;
export const getLoadingState = (state:RootState) => state.absences.status;
