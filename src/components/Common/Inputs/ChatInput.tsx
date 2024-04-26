'use client'

import React, { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { SendButton } from "../Buttons";
import { CloudArrowUpIcon, MicIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addTaskMenuItem, sendMessage, setCurrentTaskId} from "@/redux/slices/chatSlice";
import { apiCaller } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

export type ChatInputType = {
    type: Boolean;
}

const ChatInput = (props: ChatInputType) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { history, taskId, loading } = useAppSelector((state) => ({
        history: state.chat.history,
        taskId: state.chat.taskId,
        loading: state.chat.loading
    }))
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async () => {
        if(!!loading) {
            return;
        }
        // If the type is default.
        if(props.type) {
            try {
                const response = await apiCaller.post('/api/tasks/');
                if(!!response.data.taskId) {
                    await dispatch(sendMessage({
                        prompt,
                        taskId: response.data.taskId,
                        history,
                        next: () => {
                            setPrompt("");
                        }
                    }))
                    dispatch(setCurrentTaskId(response.data.taskId));
                    dispatch(addTaskMenuItem({
                        _id: response.data.taskId,
                        title: "New Task",
                        link: `/taskboard/${response.data.taskId}/chat`,
                        expand: true,
                        state: false,
                        line: false,
                    }))
                    router.push(`/taskboard/${response.data.taskId}/chat`);
                }
            } catch (error: any) {
                console.log(error.message);
            }
        } else {
            dispatch(sendMessage({
                prompt,
                taskId,
                history,
                next: () => {
                    setPrompt("");
                }
            }))
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
                onKeyDown={(e) => {
                    if(e.keyCode == 13) {
                        handleSubmit();
                        e.preventDefault();
                    }
                }}
                onChange={(e) => {
                    if(!!loading) {
                        return;
                    }
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