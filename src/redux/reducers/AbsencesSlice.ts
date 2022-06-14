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
    startIndex: number,
    endIndex: number    
}

const initialState = {
    items: [],
    filteredItems: [],
    status: 'loading',
    filterBy: 'all',
    startIndex: 0,
    endIndex: 10    
} as AbsencesState

export const fetchAbsences: any = createAsyncThunk(
    'absences/fetchAbsences',
    async () => {    
      const response = await fetch('http://localhost:3300/absences');
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
    reducers: {
        filterByType: (state, {payload}: PayloadAction<string>) => { 
            state.filterBy = payload;           
            state.filteredItems = state.items.slice(state.startIndex, state.endIndex).filter((item) => { 
                return payload !== "all" ? item.type === payload : state.items;            
              });           
        },
        filterByDate: (state, { payload }: PayloadAction<string>) => {    
            const filterAppled = state.filterBy;                          
            state.filteredItems = state.items.slice(state.startIndex, state.endIndex).filter((item, index) => {               
                if(filterAppled === "all" && (dayjs(item.startDate).isSameOrAfter(payload))) {
                    return item;
                } else {
                    if((filterAppled !== "all" && item.type === filterAppled && (dayjs(item.startDate).isSameOrAfter(payload)))) {                        
                        return item;
                    }
                }               
            })
        },
        fetchMore: (state, {payload}: PayloadAction) => {
            state.startIndex = state.startIndex + 10;
            state.endIndex = state.endIndex + 10;
            state.filteredItems = state.items.slice(state.startIndex, state.endIndex)
        },
        fetchPrevious: (state, {payload}: PayloadAction) => {
            state.startIndex = state.startIndex - 10;
            state.endIndex = state.endIndex - 10;
            state.filteredItems = state.items.slice(state.startIndex, state.endIndex)
        }
    },
    extraReducers: {
        [fetchAbsences.pending]: (state, action:PayloadAction) => {
            console.log('fetching absences...');
            state.status = "loading"
        },
        [fetchAbsences.fulfilled]: (state, action: PayloadAction<Absence[]>) => {
            console.log("Absences data fetched successfully");
            state.items = action.payload;
            state.filteredItems = action.payload.slice(state.startIndex, state.endIndex)
            state.status = "success"
        },
        [fetchAbsences.rejected]: (state, {error}) => {
            console.log('error fetching absences...');
            state.status = "failed"
        }
    }
})

export const { filterByType, filterByDate, fetchPrevious, fetchMore } = absencesSlice.actions;
export default absencesSlice.reducer;
export const getLoadingState = (state:RootState) => state.absences.status;
