"use client"

import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import ChatContainer from "@/components/ChatContainer";
import { ChatRightSidebar } from "@/components/Layout/RightSidebars";
import { apiCaller } from "@/utils/fetcher";
import { CONSTANTS } from "@/config/constants";
import { useAppDispatch } from "@/redux/hooks";
import { setHistory, setMessages } from "@/redux/slices/chatSlice";
import { setTaskId } from "@/redux/slices/chatSlice";

const ChatPage = ({params}: any) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const taskId = params.taskId;
        const fetchTask = async () => {
            const response = await apiCaller.get(`/api/tasks/${taskId}/`);
            if(!!response.data.chat) {
                let messages = [];
                for(const chat of response.data.chat) {
                    messages.push({
                        type: CONSTANTS.USER_MESSAGE_TYPE,
                        message:chat.message,
                    });
                    messages.push({
                        type: CONSTANTS.BOT_MESSAGE_TYPE,
                        is_final_outline: chat.is_final_outline,
                        message: chat.response,
                        history: chat.history,
                    });
                    dispatch(setHistory(chat.history));
                }
                dispatch(setMessages(messages));
            }
        }
        console.log(taskId);
        dispatch(setTaskId(taskId));
        fetchTask();
    }, [])
    return (
        <Layout
            rightSidebar={<ChatRightSidebar />}
        >
            <ChatContainer />
        </Layout>
    );
}

export default ChatPage;