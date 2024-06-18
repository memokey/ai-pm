"use client";

import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import TaskRequestBoard from "@/components/TaskRequestBoard";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";
import { apiCaller } from "@/utils/fetcher";
import { DEFAULT_COLS_BY_ID } from "@/data/global";
import { useAppDispatch } from "@/redux/hooks";
import { setTaskRequests } from "@/redux/slices/taskSlice";

const RequestBoard = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchTaskRequests = async () => {
            try {
                const response = await apiCaller.get(
                    `/api/tasks/getBoardRequests/`
                );
                if (!!response.data.tasks && response.data.tasks.length != 0) {
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
                                tasker_feedback: request.taskerFeedback,
                                submission: request.submission || {},
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
                    dispatch(setTaskRequests(currentRequests));
                }
            } catch (error: any) {
                console.error(error.message);
            }
        };
        fetchTaskRequests();
    }, []);

    return (
        <Layout leftSidebar={<TaskerLeftSidebar />}>
            <TaskRequestBoard />
        </Layout>
    );
};

export default RequestBoard;
