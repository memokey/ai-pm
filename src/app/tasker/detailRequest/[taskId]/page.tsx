"use client"

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import DetailRequest from "@/components/DetailRequest";
import { useAppSelector } from "@/redux/hooks";
import { DEFAULT_TASKS } from "@/data/global";
import { TaskType } from "@/data/types/type";
import { useRouter } from "next/navigation";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";
import { fetcher } from "@/utils/fetcher";

const TaskBoardPage = ({params}: any) => {
    const router = useRouter();
    const [detailTask, setDetailTask] = useState<any>(null);

    useEffect(() => {
        const fetchTaskRequest = async () => {
            try {
                const res = await fetcher(`api/tasks/getRequest/${params.taskId}`);
                setDetailTask({
                    id: res._id,
                    cost: res.cost,
                    title: res.title,
                    description: res.description,
                    parentId: res.parent_id,
                    priority: res.priority,
                    requester: res.requester,
                    status: res.status,
                    labels: res.labels,
                    dueDate: res.dueDate || "Not Assigned",
                    createdAt: res.created_at,
                    updatedAt: res.updated_at,
                })
            } catch (error: any) {
                console.error(error.message);
            }
        }

        if(!!params.taskId) {
            fetchTaskRequest();
        }
    }, [params.taskId])

    return (
        <Layout 
            leftSidebar={
                <TaskerLeftSidebar />
            }
        >
            {!!detailTask && (
                <DetailRequest 
                    {...detailTask}
                />
            )}
        </Layout>
    );
}

export default TaskBoardPage;