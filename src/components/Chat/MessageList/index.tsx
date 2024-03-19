import React from "react";
import Message from "../Message";
import { MESSAGES } from "@/data/Chat";

const MessageList = () => {
    return (
        <div className="h-[calc(100vh-200px)] overflow-x-hidden overflow-y-auto grid gap-4 py-5">
            {MESSAGES.map((message, index) => (
                <Message
                    key={index}
                    sender={message.sender}
                    content={message.content} 
                />
            ))}
        </div>
    );
}

export default MessageList;