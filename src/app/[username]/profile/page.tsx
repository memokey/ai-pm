import Layout from "@/components/Layout";
import TaskerProfile from "@/components/Tasker/TaskerProfile";
import { PROFILE } from "@/data/global";
import React from "react";

const ProfilePage = () => {
    return (
        <Layout>
            <TaskerProfile
                {...PROFILE[0]} 
            />
        </Layout>
    );
}

export default ProfilePage;