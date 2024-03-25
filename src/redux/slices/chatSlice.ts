'use client'

import { MessageType } from '@/components/ChatContainer/Chatbox/UserMessage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
    loading: Boolean;
    messages: MessageType[];
    baseModal: Boolean;
}

const initialState: ChatState = {
    loading: false,
    messages: [],
    baseModal: false,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLoading: (state, action: PayloadAction<Boolean>) => {
            state.loading = action.payload
        },
        setBaseModoal: (state, action: PayloadAction<Boolean>) => {
            state.baseModal = action.payload
        },
    },
})

export const {
    setLoading,
    setBaseModoal
} = chatSlice.actions

export default chatSlice.reducer
