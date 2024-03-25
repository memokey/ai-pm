'use client'

import { DEFAULT_TASKS } from '@/data/global';
import { Id, TaskType } from '@/data/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TaskState {
    activeDetail: Boolean;
    // tasks: TaskType[];
    taskId: Id;
}

const initialState: TaskState = {
    activeDetail: false,
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
        // setTasks: (state, action: PayloadAction<TaskType[]>) => {
        //     state.tasks = action.payload;
        // },
    },
})

export const {
    setActiveDetail,
    // setTasks,
    setTaskId,
} = taskSlice.actions

export default taskSlice.reducer
