'use client'

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import chatReducer from './slices/chatSlice'
import taskReducer from './slices/taskSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            chat: chatReducer,
            task: taskReducer,
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
