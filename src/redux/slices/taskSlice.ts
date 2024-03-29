'use client'

import { DEFAULT_TASKS } from '@/data/global';
import { Id, TaskType } from '@/data/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TaskState {
    activeDetail: Boolean;
    taskDetailModal: Boolean;
    // tasks: TaskType[];
    taskId: Id;
}

const initialState: TaskState = {
    activeDetail: false,
    taskDetailModal: false,
    // tasks: DEFAULT_TASKS,
    taskId: "0",
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setActiveDetail: (state, action: PayloadAction<Boolean>) => {
            state.activeDetail = action.payload;
        },
        setTaskId: (state, action: PayloadAction<Id>) => {
            state.taskId = action.payload;
        },
        setTaskDetailModal: (state, action: PayloadAction<Boolean>) => {
            state.taskDetailModal = action.payload;
        },
    },
})

export const {
    setActiveDetail,
    setTaskDetailModal,
    setTaskId,
} = taskSlice.actions

export default taskSlice.reducer
