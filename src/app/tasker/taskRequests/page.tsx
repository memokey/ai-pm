"use client"

import React from "react";
import Layout from "@/components/Layout";
import TaskRequests from "@/components/TaskRequests";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";

const TaskBoardPage = () => {
    return (
        <Layout 
            leftSidebar={
                <TaskerLeftSidebar />
            }
        >
            <TaskRequests />
        </Layout>
    );
}

export default TaskBoardPage;