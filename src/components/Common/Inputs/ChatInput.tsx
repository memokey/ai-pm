'use client'

import React, { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { SendButton } from "../Buttons";
import { CloudArrowUpIcon, MicIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage, addStreamingMessage, setGeneratedTasks, setHistory, setIsGeneratedTasks, setLoading, setMessages, setStreamingFlag } from "@/redux/slices/chatSlice";
import { CONSTANTS } from "@/config/constants";
import { apiCaller } from "@/utils/fetcher";

const ChatInput = () => {
    const dispatch = useAppDispatch();
    const { history, taskId } = useAppSelector((state) => ({
        history: state.chat.history,
        taskId: state.chat.taskId
    }))
    const [prompt, setPrompt] = useState("");
    const { messages } = useAppSelector(state => state.chat);

    const handleSubmit = async () => {
        try {
            if (prompt.trim().length === 0) {
                return;
            }

            dispatch(addMessage({
                message: prompt.trim(),
                type: CONSTANTS.USER_MESSAGE_TYPE,
            }));
            try {
                const response = await apiCaller.post(`/api/tasks/${taskId}/chat/`, {
                    message: prompt.trim(), history 
                });
                setPrompt("");
    
                dispatch(setHistory(response.data.history));
                dispatch(setLoading(false));
                if(response.data.is_final_outline == true) {
                    dispatch(setIsGeneratedTasks(true));
                    dispatch(setGeneratedTasks(response.data.final_outline.main_tasks[0].sub_tasks));
                    dispatch(addMessage({
                        message: response.data.response,
                        type: CONSTANTS.BOT_MESSAGE_TYPE,
                    }));
                    return;
                }
                dispatch(addMessage({
                    message: response.data.response,
                    id: new Date().toISOString(),
                    type: CONSTANTS.BOT_MESSAGE_TYPE,
                }));
            } catch (error) {
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <label className="bg-[#2a2a2a] border-base-200 py-4 px-5 flex items-end shadow-[#141414] shadow-md gap-2 rounded-[30px] w-full">
            <TextareaAutosize 
                minRows={1}
                maxRows={10}
                className="bg-[#2a2a2a] hover:border-transparent outline-none focus-visible:outline-none hover:outline-none text-[#f3f3f3] border-transparent resize-none box-border
                mt-[-5px] w-full text-[12px] overflow-visible font-[400]" 
                placeholder="Enter a prompt here"
                value={prompt}
                onChange={(e) => {
                    setPrompt(e.target.value);
                }}  
            />
            <div className="flex gap-4 items-end h-full">
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <CloudArrowUpIcon />
                </div>
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <MicIcon />
                </div>
                <SendButton 
                    sendMessage={handleSubmit}
                />
            </div>
        </label>
    );
}

export default ChatInput;