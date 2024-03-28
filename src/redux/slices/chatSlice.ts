'use client'

import { MessageType } from '@/components/ChatContainer/Chatbox/UserMessage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
    loading: Boolean;
    messages: MessageType[];
    modal:Boolean;
    baseModal: Boolean;
    reviewerModal: Boolean;
    agentModal: Boolean;
}

const initialState: ChatState = {
    loading: false,
    messages: [],
    modal: false,
    baseModal: false,
    reviewerModal: false,
    agentModal: false,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLoading: (state, action: PayloadAction<Boolean>) => {
            state.loading = action.payload
        },
        setModal: (state, action: PayloadAction<Boolean>) => {
            state.modal = action.payload
        },
        setBaseModoal: (state, action: PayloadAction<Boolean>) => {
            state.baseModal = action.payload
        },
        setReviewerModal: (state, action: PayloadAction<Boolean>) => {
            state.reviewerModal = action.payload
        },
        setAgentModal: (state, action: PayloadAction<Boolean>) => {
            state.agentModal = action.payload
        },
    },
})

export const {
    setLoading,
    setModal,
    setBaseModoal,
    setReviewerModal,
    setAgentModal,
} = chatSlice.actions

export default chatSlice.reducer
