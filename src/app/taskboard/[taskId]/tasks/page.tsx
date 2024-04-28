"use client"

import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import ChatContainer from "@/components/ChatContainer";
import { ChatRightSidebar, TaskDetail } from "@/components/Layout/RightSidebars";
import TaskBoard from "@/components/TaskBoard";
import TaskBoardHeader from "@/components/TaskBoard/TaskBoardHeader";
import { setTaskId, setTasks } from "@/redux/slices/taskSlice";
import { DEFAULT_COLS_BY_ID } from "@/data/global";
import { setHistory, setLoading, setMessages } from "@/redux/slices/chatSlice";
import { CONSTANTS } from "@/config/constants";
import { apiCaller } from "@/utils/fetcher";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const TaskBoardPage = ({params}: any) => {
    const dispatch = useAppDispatch();
    const { tasks, messages } = useAppSelector(state => ({
        tasks: state.task.tasks,
        messages: state.chat.messages
    }));
    useEffect(() => {
        const taskId = params.taskId;
        const fetchTask = async () => {
            try {
                dispatch(setLoading(true));
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
                if(!!response.data.tasks && response.data.tasks.length != 0) {
                    let currentTasks: any[] = [];
                    convertTasks(response.data.tasks, currentTasks);
                    dispatch(setTasks(currentTasks));
                }   
                dispatch(setLoading(false));
            } catch (error) {
                console.error('Fetching task issue.');
            }
        }
        const convertTasks = (tasks: any[], currentTasks: any[] = []) => {
            for(const task of tasks) {
                currentTasks.push({
                    id: task.id,
                    columnId: task.status,
                    parentId: task.parent_id,
                    title: task.title,
                    description: task.description,
                    taskProgress: 0,
                    created: task.created_at || "Yesterday",
                    lastUpdated: task.updated_at || "Just Now",
                    properties: {
                        cost: task.cost,
                        status: DEFAULT_COLS_BY_ID[task.status],
                        assignees: [],
                        priority: 0,
                        dueDate: "Yesterday",
                        agents: [],
                        humans: [],
                        messages: task.chat.length,
                        shares: 1
                    }
                })
                if(task.tasks.length != 0) {
                    convertTasks(task.tasks, currentTasks);
                }
            }
        }
        dispatch(setTaskId(taskId));
        if(tasks.length == 0 && messages.length == 0) {
            fetchTask();
        }
    }, [])

    return (
        <Layout
            header={<TaskBoardHeader />}
        >
            <TaskBoard />
        </Layout>
    );
}

export default TaskBoardPage;