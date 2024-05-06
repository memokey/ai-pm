import Layout from "@/components/Layout";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";
import TaskerProfile from "@/components/Tasker/TaskerProfile";
import { fetcher } from "@/utils/fetcher";
import React from "react";

function getData(userId: string) {
    try {
        const res = fetcher("api/profiles/" + userId);
        return res;
    } catch (error: any) {
        console.error(error.message);
    }
}

const ProfilePage = async ({ params: { userId } }: any) => {
    const profile = await getData(userId);
    return (
        <Layout leftSidebar={<TaskerLeftSidebar />}>
            <div>{!!profile._id && <TaskerProfile {...profile} />}</div>
        </Layout>
    );
};

export default ProfilePage;
