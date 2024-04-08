'use client'

import { DEFAULT_TASKS } from '@/data/global';
import { Id, TaskType } from '@/data/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TaskerState {
    taskerModal: Boolean;
}

const initialState: TaskerState = {
    taskerModal: false,
}

export const taskerSlice = createSlice({
    name: 'tasker',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTaskerModal: (state, action: PayloadAction<Boolean>) => {
            state.taskerModal = action.payload;
        }
    },
})

export const {
    setTaskerModal,
} = taskerSlice.actions

export default taskerSlice.reducer
