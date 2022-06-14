import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Member {
  crewId: number
  id: number
  image: string
  name: string
  userId: number
}

interface MembersState {
    items: Member[]    
}

const initialState = {
    items: []    
} as MembersState

export const fetchMembers: any = createAsyncThunk(
    'members/fetchMembers',
    async () => {    
      const response = await fetch('http://localhost:3300/members');
      if (response.ok) {
        const result = await response.json();      
        return result.members.payload;
      } else {
        const error: any = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      }
    }
);

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMembers.pending]: (state: any, action:any) => {
            console.log('fetching members...');           
        },
        [fetchMembers.fulfilled]: (state: any, action: any) => {
            console.log("Members data fetched successfully");
            state.items = action.payload;            
        },
        [fetchMembers.rejected]: (state: any, action:any) => {
            console.log('error fetching members...');            
        }
    }
})

export default membersSlice.reducer;
