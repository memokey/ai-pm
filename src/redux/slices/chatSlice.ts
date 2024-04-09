'use client'

import { MessageType } from '@/components/ChatContainer/Chatbox/UserMessage';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
    loading: Boolean;
    messages: MessageType[];
    modal:Boolean;
    baseModal: Boolean;
    reviewerModal: Boolean;
    agentModal: Boolean;
    streamingMessage: string;
    streamingFlag: Boolean;
    generatedTasks: any[];
    isGeneratedTasks: Boolean;
}

const initialState: ChatState = {
    loading: false,
    messages: [],
    modal: false,
    baseModal: false,
    reviewerModal: false,
    agentModal: false,
    streamingMessage: '',
    streamingFlag: false,
    generatedTasks: [],
    isGeneratedTasks: false,
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
        setMessages: (state, action: PayloadAction<MessageType[]>) => {
            state.messages = action.payload
        },
        addMessage: (state, action: PayloadAction<MessageType>) => {
            state.messages = [...current(state).messages, action.payload];
        },
        addStreamingMessage: (state, action: PayloadAction<String>) => {
            state.streamingMessage = current(state).streamingMessage + action.payload;
        },
        setStreamingFlag: (state, action: PayloadAction<Boolean>) => {
            state.streamingFlag = action.payload
        },
        setGeneratedTasks: (state, action: PayloadAction<any[]>) => {
            let tasks = action.payload;
            let renderedTasks = tasks && tasks.map((task: any, index) => {
                return {
                    id: index + "",
                    columnId: "todo",
                    title: task.title,
                    description: task.description,
                    price: task.cost,

                }
            })
            state.generatedTasks = renderedTasks;
        },
        setIsGeneratedTasks: (state, action: PayloadAction<Boolean>) => {
            state.isGeneratedTasks = action.payload
        },
    },
})

export const {
    setLoading,
    setModal,
    setBaseModoal,
    setReviewerModal,
    setAgentModal,
    setMessages,
    addMessage,
    addStreamingMessage,
    setStreamingFlag,
    setGeneratedTasks,
    setIsGeneratedTasks,
} = chatSlice.actions

export default chatSlice.reducer
