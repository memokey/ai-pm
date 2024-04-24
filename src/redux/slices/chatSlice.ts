'use client'

import { MessageType } from '@/components/ChatContainer/Chatbox/UserMessage';
import { CONSTANTS } from '@/config/constants';
import { SendMessageTpye } from '@/data/types/type';
import { apiCaller } from '@/utils/fetcher';
import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
    loading: Boolean;
    messages: MessageType[];
    history: any[];
    modal:Boolean;
    baseModal: Boolean;
    reviewerModal: Boolean;
    agentModal: Boolean;
    streamingMessage: string;
    streamingFlag: Boolean;
    generatedTasks: any[];
    isGeneratedTasks: Boolean;
    taskId: String;
    
}

const initialState: ChatState = {
    loading: false,
    messages: [],
    history: [],
    modal: false,
    baseModal: false,
    reviewerModal: false,
    agentModal: false,
    streamingMessage: '',
    streamingFlag: false,
    generatedTasks: [],
    isGeneratedTasks: false,
    taskId: "",
}

export const sendMessage = createAsyncThunk<any, SendMessageTpye>(
    'chat/sendMessage',
    async (
        { prompt, taskId, history, next }: SendMessageTpye,
        { dispatch }
    ) => {
        let response = false;
        if (prompt.trim().length === 0) {
            return;
        }

        dispatch(addMessage({
            message: prompt.trim(),
            type: CONSTANTS.USER_MESSAGE_TYPE,
        }));
        try {
            dispatch(setLoading(true));
            const res = await apiCaller.post(`/api/tasks/${taskId}/chat/`, {
                message: prompt.trim(), history 
            });

            dispatch(setHistory(res.data.history));
            dispatch(setLoading(false));
            if(res.data.is_final_outline == true) {
                dispatch(setIsGeneratedTasks(true));
                dispatch(setGeneratedTasks(res.data.final_outline.main_tasks[0].sub_tasks));
                dispatch(addMessage({
                    message: res.data.response,
                    type: CONSTANTS.BOT_MESSAGE_TYPE,
                }));
                return;
            }
            dispatch(addMessage({
                message: res.data.response,
                id: new Date().toISOString(),
                type: CONSTANTS.BOT_MESSAGE_TYPE,
            }));
            response = true;
            if (next) next()
        } catch (error: any) {
            console.error(error.message);
        }
        return response;
    })

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
        setHistory: (state, action: PayloadAction<any>) => {
            state.history = action.payload
        },
        setTaskId: (state, action: PayloadAction<string>) => {
            state.taskId = action.payload
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
    setHistory,
    addMessage,
    addStreamingMessage,
    setStreamingFlag,
    setGeneratedTasks,
    setIsGeneratedTasks,
    setTaskId,
} = chatSlice.actions

export default chatSlice.reducer
