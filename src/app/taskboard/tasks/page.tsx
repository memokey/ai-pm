import React from "react";
import Layout from "@/components/Layout";
import ChatContainer from "@/components/ChatContainer";
import { ChatRightSidebar, TaskDetail } from "@/components/Layout/RightSidebars";
import TaskBoard from "@/components/TaskBoard";
import TaskBoardHeader from "@/components/TaskBoard/TaskBoardHeader";

const TaskBoardPage = () => {
    return (
        <Layout
            rightSidebar={<TaskDetail />}
            header={<TaskBoardHeader />}
        >
            <TaskBoard />
        </Layout>
    );
}

export default TaskBoardPage;