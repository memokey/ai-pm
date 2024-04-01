'use client'

import React, { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { SendButton } from "../Buttons";
import { CloudArrowUpIcon, MicIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage, addStreamingMessage, setLoading, setMessages, setStreamingFlag } from "@/redux/slices/chatSlice";
import { CONSTANTS } from "@/config/constants";

const ChatInput = () => {
    const dispatch = useAppDispatch();
    const [prompt, setPrompt] = useState("");
    const { messages } = useAppSelector(state => state.chat);

    const handleSubmit = async () => {
        try {
            if (prompt.trim().length === 0) {
                return;
            }

            dispatch(addMessage({
                message: prompt.trim(),
                id: new Date().toISOString(),
                type: CONSTANTS.USER_MESSAGE_TYPE,
            }));

            const response = await fetch('/api/completion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: [{ role: 'user', content: prompt.trim() }] })
            });
            setPrompt("");

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the streaming response as text
            const reader = response.body?.getReader();
            let messageStream = '';
            dispatch(setStreamingFlag(true));

            while (true && !!reader) {
                const { done, value } = await reader.read();

                if (done) {
                    dispatch(addMessage({
                        message: messageStream,
                        id: new Date().toISOString(),
                        type: CONSTANTS.BOT_MESSAGE_TYPE,
                    }));
                    dispatch(setStreamingFlag(false));
                    dispatch(setLoading(false));
                    break;
                }
                messageStream += new TextDecoder().decode(value);
                dispatch(addStreamingMessage(new TextDecoder().decode(value)));
                // Here you can update your UI with each message received from the server
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
                className="bg-[#2a2a2a] hover:border-transparent focus-visible:outline-none hover:outline-none text-[#f3f3f3] border-transparent resize-none box-border
                mt-[-5px] w-full text-[16px] overflow-visible font-[400]" 
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