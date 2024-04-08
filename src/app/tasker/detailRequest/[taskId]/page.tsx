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
    const [detailTask, setDetailTask] = useState<TaskType>(DEFAULT_TASKS[0]);
    const router = useRouter();

    useEffect(() => {
        if(!!params.taskId) {
            const selectedIndex = DEFAULT_TASKS.findIndex(t => t.id == params.taskId);
            if(selectedIndex != -1) {
                setDetailTask(DEFAULT_TASKS[selectedIndex]);
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