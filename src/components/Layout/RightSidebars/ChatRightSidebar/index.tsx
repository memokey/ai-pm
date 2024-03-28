'use client'

import { ProgressBar } from "@/components/Common/Progresses";
import HeaderTitle from "@/components/Common/Title";
import { ExclamationCircleIcon, PlusIcon } from "@/components/Icons";
import React from "react";
import AgentListItem from "./AgentListItem";
import { setAgentModal, setReviewerModal } from "@/redux/slices/chatSlice";
import { useAppDispatch } from "@/redux/hooks";

const ChatRightSidebar = () => {
    const dispatch = useAppDispatch();
    return (
        <div className="w-[300px] h-[calc(100vh-56px)] border-base-200 border-l">
            <div className="p-6 grid gap-4 border-base-200 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="font-600 text-[14px] text-[#737373]">Human/AI Ratio</h2>
                    <div className="cursor-pointer text-[#585757] hover:text-base-300">
                        <ExclamationCircleIcon />
                    </div>
                </div>
                <ProgressBar />
            </div>
            <div className="border-base-200 border-b p-6 grid gap-[20px]">
                <HeaderTitle 
                    title="Human/AI Ratio"
                    onAdd={() => dispatch(setReviewerModal(true))}
                />
                <div className="grid gap-4">
                    <AgentListItem 
                        img="/tmp/avatars/assignee.png"
                        name="Marshal Martin"
                    />
                    <AgentListItem 
                        img="/tmp/avatars/user.png"
                        name="James Martin"
                    />
                </div>
                <div className="flex">
                    <div className="pr-2 border-base-200 border-r text-[12px] font-600 text-base-300">
                        Overall Accuracy: 85%
                    </div>
                    <div className="pl-2 text-[12px] font-600 text-base-300">
                        Task: $44/h
                    </div>
                </div>
            </div>
            <div className="border-base-200 border-b p-6 grid gap-5">
                <HeaderTitle 
                    title="Your Ai Agents"
                    onAdd={() => dispatch(setAgentModal(true))}
                />
                <div className="grid gap-4">
                    <AgentListItem 
                        img="/images/utils/chatgpt.png"
                        name="Chatgpt"
                    />
                    <AgentListItem 
                        img="/images/utils/Ada.png"
                        name="Claude"
                    />
                </div>
                <div className="flex">
                    <div className="pr-2 border-base-200 border-r text-[12px] font-600 text-base-300">
                        Overall Accuracy: 85%
                    </div>
                    <div className="pl-2 text-[12px] font-600 text-base-300">
                        Task: $44/h
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRightSidebar;