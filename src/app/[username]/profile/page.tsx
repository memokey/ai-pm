import Layout from "@/components/Layout";
import TaskerLeftSidebar from "@/components/Layout/TaskerLeftSidebar";
import TaskerProfile from "@/components/Tasker/TaskerProfile";
import { PROFILE } from "@/data/global";
import { fetcher } from "@/utils/fetcher";
import React, { useEffect } from "react";

function getData(username: string) {
    const res = fetcher('api/profiles/' + username);
    return res;
  }

const ProfilePage = async ({params: {username}}: any) => {
    const profile = await getData(username);
    return (
        <Layout
            leftSidebar={<TaskerLeftSidebar />}
        >   
            {!!profile._id && (
                <TaskerProfile
                    {...profile}
                />
            )}
        </Layout>
    );
}

export default ProfilePage;