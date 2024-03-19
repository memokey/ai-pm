'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
    loading: Boolean;
}

const initialState: ChatState = {
    loading: false,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLoading: (state, action: PayloadAction<Boolean>) => {
            state.loading = action.payload
        }
    },
})

export const {
    setLoading,
} = chatSlice.actions

export default chatSlice.reducer
