"use client"

import React from "react";
import Layout from "@/components/Layout";
import TaskRequestBoard from "@/components/TaskRequestBoard";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";

const RequestBoard = () => {
    return (
        <Layout 
            leftSidebar={
                <TaskerLeftSidebar />
            }
        >
            <TaskRequestBoard />
        </Layout>
    );
}

export default RequestBoard;