'use client'

import { MessageType } from '@/components/ChatContainer/Chatbox/UserMessage';
import { CONSTANTS } from '@/config/constants';
import { DEFAULT_COLS_BY_ID } from '@/data/global';
import { SendMessageTpye } from '@/data/types/type';
import { apiCaller } from '@/utils/fetcher';
import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { setTasks } from './taskSlice';
import { convertTasks } from '@/utils/convertTasks';

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
    taskMenuItems: any[];
    currentTaskId: String;
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
    taskMenuItems: [],
    currentTaskId: "",
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
                let currentTasks: any = [];
                convertTasks(res.data.tasks, currentTasks);
                dispatch(setTasks(currentTasks))
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
        setTaskMenuItems: (state, action: PayloadAction<any[]>) => {
            state.taskMenuItems = action.payload
        },
        setGeneratedTasks: (state, action: PayloadAction<any[]>) => {
            let tasks = action.payload;
            let renderedTasks = tasks && tasks.map((task: any, index) => {
                return {
                    id: task._id,
                    columnId: "todo",
                    title: task.title,
                    description: task.description || "",
                    price: task.cost || 0,
                    status: task.status || CONSTANTS.TASK_WAITING,
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
        setCurrentTaskId: (state, action: PayloadAction<string>) => {
            state.currentTaskId = action.payload
        },
        setTaskExpand: (state, action: PayloadAction<any>) => {
            const { _id, expand } = action.payload;
            state.taskMenuItems = current(state).taskMenuItems.map((item) => {
                return {
                    ...item,
                    expand: item._id == _id ? expand: false,
                }
            })
        },
        addTaskMenuItem: (state, action: PayloadAction<any>) => {
            state.taskMenuItems = [...current(state).taskMenuItems, action.payload];
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
    setTaskMenuItems,
    setCurrentTaskId,
    setTaskExpand,
    addTaskMenuItem,
} = chatSlice.actions

export default chatSlice.reducer
