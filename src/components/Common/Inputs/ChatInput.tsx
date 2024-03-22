'use client'

import React from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { SendButton } from "../Buttons";
import { CloudArrowUpIcon, MicIcon } from "@/components/Icons";

const ChatInput = () => {
    return (
        <label className="bg-[#2a2a2a] border-base-200 py-4 px-5 flex items-end gap-2 rounded-[30px] w-full">
            <TextareaAutosize 
                minRows={1}
                maxRows={10}
                className="bg-[#2a2a2a] hover:border-transparent focus-visible:outline-none hover:outline-none text-[#f3f3f3] border-transparent resize-none box-border
                mt-[-5px] w-full text-[16px] overflow-visible font-[400]" 
                placeholder="Enter a prompt here" 
            />
            <div className="flex gap-4 items-end h-full">
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <CloudArrowUpIcon />
                </div>
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <MicIcon />
                </div>
                <SendButton />
            </div>
        </label>
    );
}

export default ChatInput;