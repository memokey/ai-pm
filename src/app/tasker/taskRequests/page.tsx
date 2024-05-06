"use client";

import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import TaskRequests from "@/components/TaskRequests";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";
import { apiCaller } from "@/utils/fetcher";
import { DEFAULT_COLS_BY_ID } from "@/data/global";
import { setTaskListRequests, setTaskRequests } from "@/redux/slices/taskSlice";
import { useAppDispatch } from "@/redux/hooks";

const TaskBoardPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchTaskRequests = async () => {
            try {
                const response = await apiCaller.get(`/api/tasks/getRequests/`);
                if (!!response.data.tasks) {
                    let currentRequests = [];
                    for (const request of response.data.tasks) {
                        currentRequests.push({
                            id: request.id,
                            columnId: request.status,
                            parentId: request.parentId,
                            title: request.title,
                            description: request.description,
                            cost: request.cost || 0,
                            taskProgress: 0,
                            created: request.createdAt || "Yesterday",
                            lastUpdated: request.updatedAt || "Just Now",
                            properties: {
                                status: DEFAULT_COLS_BY_ID[request.status],
                                assignees: [],
                                requester: request.requester,
                                priority: request.priority,
                                dueDate: request.dueDate || "Not Assigned",
                                agents: [],
                                humans: [],
                                messages: 0,
                                shares: 1,
                            },
                        });
                    }
                    dispatch(setTaskListRequests(currentRequests));
                }
            } catch (error: any) {
                console.error(error.message);
            }
        };
        fetchTaskRequests();
    }, []);
    return (
        <Layout leftSidebar={<TaskerLeftSidebar />}>
            <TaskRequests />
        </Layout>
    );
};

export default TaskBoardPage;
