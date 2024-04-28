"use client"

import React from "react";
import Layout from "@/components/Layout";
import { ChatRightSidebar } from "@/components/Layout/RightSidebars";
import ChatStaticContainer from "@/components/ChatStaticContainer";

const DefaultChatPage = () => {

    return (
        <Layout
            rightSidebar={<ChatRightSidebar />}
        >
            <ChatStaticContainer />
        </Layout>
    );
}

export default DefaultChatPage;