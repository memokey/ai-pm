import React from "react";
import MessageInput from "../Common/Inputs/ChatInput";
import MessageList from "../Chat/MessageList";

const RightSidebar = () => {
    return (
        <div className="w-[480px] border-l border-base-200 px-5">
            <MessageList />
            <MessageInput />
        </div>
    );
}

export default RightSidebar;