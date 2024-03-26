import React from "react";
import Layout from "@/components/Layout";
import ChatContainer from "@/components/ChatContainer";
import { ChatRightSidebar } from "@/components/Layout/RightSidebars";

const DefaultChatPage = () => {
    return (
        <Layout
            rightSidebar={<ChatRightSidebar />}
        >
            <ChatContainer />
        </Layout>
    );
}

export default DefaultChatPage;