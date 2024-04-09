import Layout from "@/components/Layout";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";
import TaskerProfile from "@/components/Tasker/TaskerProfile";
import { PROFILE } from "@/data/global";
import React from "react";

const ProfilePage = () => {
    return (
        <Layout
            leftSidebar={<TaskerLeftSidebar />}
        >
            <TaskerProfile
                {...PROFILE[0]} 
            />
        </Layout>
    );
}

export default ProfilePage;