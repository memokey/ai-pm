import React from "react";
import MessageInput from "../Common/Inputs/MessageInput";
import MessageList from "../Chat/MessageList";

// AI Chatbox
const RightSidebar = () => {
    return (
        <div className="w-[480px] border-l border-base-200 px-10">
            <MessageList />
            <MessageInput />
        </div>
    );
}

export default RightSidebar;