'use client'

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { AgentsModal, BaseModal, ReviewersModal } from "../Common/Modals";
import TaskDetailModal from "../Common/Modals/TaskDetailModal";
import { TaskType } from "@/data/types/type";
import { DEFAULT_TASKS } from "@/data/global";
import Chatbox from "../ChatContainer/Chatbox";
import { ChatInput } from "../Common/Inputs";

const ChatStaticContainer = () => {
    const { baseModal, reviewerModal, agentModal, taskDetailModal, taskId, messages, streamingFlag, streamingMessage } = useAppSelector((state) => ({
        baseModal: state.chat.baseModal,
        reviewerModal: state.chat.reviewerModal,
        agentModal: state.chat.agentModal,
        taskDetailModal: state.task.taskDetailModal,
        taskId: state.task.taskId,
        messages: state.chat.messages,
        streamingFlag: state.chat.streamingFlag,
        streamingMessage: state.chat.streamingMessage,
    }));

    const [taskDetail, setTaskDetail] = useState<TaskType | null>(null);

    useEffect(() => {
        // const detailIndex = DEFAULT_TASKS.findIndex((t) => t.id == taskId);
        // if(detailIndex != -1) {
            setTaskDetail(DEFAULT_TASKS[1])
        // }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            let box = document.getElementById('chatting_thread_box_1')
            if (box) {
                let height = box.scrollHeight + 113
                box.scroll({ top: height, behavior: 'smooth' })
            }
        }, 100)
    }, [messages, streamingFlag, streamingMessage])

    return (
        <div className="w-[calc(100vw-540px)] relative h-[calc(100vh-56px)] mx-auto pt-[20px]">
            <div className="w-full h-[calc(100vh-156px)] overflow-y-auto pb-10 px-[95px]" id="chatting_thread_box_1">
                <Chatbox />
            </div>
            <div className="w-full absolute bottom-[23px] px-[95px]">
                <ChatInput type={true}/>
            </div>
            {!!reviewerModal && (
                <ReviewersModal
                    title="Human Reviewers"
                />
            )}
            {!!agentModal && (
                <AgentsModal 
                    title="AI Agents"
                />
            )}
        </div>
    );
}

export default ChatStaticContainer;