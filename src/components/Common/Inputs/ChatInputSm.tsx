"use client";

import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { SendButtonSm } from "../Buttons";
import { CloudArrowUpIcon, MicIcon } from "@/components/Icons";
import { useAppSelector } from "@/redux/hooks";

export type ChatInputSmType = {
    sendMessage?: any;
    message?: string;
    setMessage?: (index: string) => void;
};

const ChatInputSm = (props: ChatInputSmType) => {
    const { loading } = useAppSelector((state) => ({
        loading: state.chat.loading,
    }));

    return (
        <label className="bg-[#2a2a2a] border-base-200 py-[4px] px-[6px] flex items-end gap-2 rounded-[6px] w-full">
            <TextareaAutosize
                minRows={1}
                maxRows={10}
                className="bg-[#2a2a2a] hover:border-transparent focus-visible:outline-none outline-none hover:outline-none text-[#f3f3f3] border-transparent resize-none box-border
                mt-[-5px] w-full text-[12px] overflow-visible font-[400]"
                placeholder="Add a comment"
                value={props.message}
                onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                        props.sendMessage();
                        e.preventDefault();
                    }
                }}
                onChange={(e) => {
                    if (!!loading) {
                        return;
                    }
                    !!props.setMessage && props.setMessage(e.target.value);
                }}
            />
            <div className="flex gap-[11px] items-end h-full">
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <CloudArrowUpIcon size={16} />
                </div>
                <div className="cursor-pointer hover:text-primary opacity-70">
                    <MicIcon size={16} />
                </div>
                <SendButtonSm sendMessage={props.sendMessage} />
            </div>
        </label>
    );
};

export default ChatInputSm;
