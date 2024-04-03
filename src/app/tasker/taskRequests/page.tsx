"use client"

import React from "react";
import Layout from "@/components/Layout";
import TaskRequests from "@/components/TaskRequests";

const TaskBoardPage = () => {
    return (
        <Layout>
            <TaskRequests />
        </Layout>
    );
}

export default TaskBoardPage;