"use client"

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import TaskRequests from "@/components/TaskRequests";
import DetailRequest from "@/components/DetailRequest";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { DEFAULT_TASKS } from "@/data/global";
import { TaskType } from "@/data/types/type";
import { useRouter } from "next/navigation";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";

const TaskBoardPage = ({params}: any) => {
    const router = useRouter();
    const { requests } = useAppSelector(state => state.task);
    const [detailTask, setDetailTask] = useState<TaskType>(requests[0] || DEFAULT_TASKS[0]);

    useEffect(() => {
        if(!!params.taskId) {
            const selectedIndex = requests.findIndex(t => t.id == params.taskId);
            if(selectedIndex != -1) {
                setDetailTask(requests[selectedIndex]);
            }
        }
    }, [params.taskId])

    return (
        <Layout 
            leftSidebar={
                <TaskerLeftSidebar />
            }
        >
            <DetailRequest 
                {...detailTask}
            />
        </Layout>
    );
}

export default TaskBoardPage;