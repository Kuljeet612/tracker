import { configureStore } from "@reduxjs/toolkit";
import absencesReducer from "./reducers/AbsencesSlice";
import membersReducer from "./reducers/MembersSlice"; 

export const store = configureStore({
    reducer: {
        absences: absencesReducer,
        members: membersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;