'use client'

import React from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { SendButtonSm } from "../Buttons";
import { CloudArrowUpIcon, MicIcon } from "@/components/Icons";

const ChatInputSm = () => {
    return (
        <label className="bg-[#2a2a2a] border-base-200 py-[4px] px-[6px] flex items-end gap-2 rounded-[6px] w-full">
            <TextareaAutosize 
                minRows={1}
                maxRows={10}
                className="bg-[#2a2a2a] hover:border-transparent focus-visible:outline-none outline-none hover:outline-none text-[#f3f3f3] border-transparent resize-none box-border
                mt-[-5px] w-full text-[12px] overflow-visible font-[400]" 
                placeholder="Add a comment" 
            />
            <div className="flex gap-[11px] items-end h-full">
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <CloudArrowUpIcon size={16} />
                </div>
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <MicIcon size={16}/>
                </div>
                <SendButtonSm />
            </div>
        </label>
    );
}

export default ChatInputSm;