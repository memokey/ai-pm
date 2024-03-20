import React from "react";
import Layout from "@/components/Layout";
import ChatContainer from "@/components/ChatContainer";
import { ChatRightSidebar } from "@/components/Layout/RightSidebars";

const ChatPage = () => {
    return (
        <Layout
            rightSidebar={<ChatRightSidebar />}
        >
            <ChatContainer />
        </Layout>
    );
}

export default ChatPage;