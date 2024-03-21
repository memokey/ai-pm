import React from "react";
import { ChatInput } from "../Common/Inputs";
import Chatbox from "./Chatbox";

const ChatContainer = () => {
    return (
        <div className="w-[calc(100vw-540px)] relative h-[calc(100vh-56px)] mx-auto pt-[20px]">
            <div className="w-full h-[calc(100vh-156px)] overflow-y-auto pb-10 px-[95px]">
                <Chatbox />
            </div>
            <div className="w-full absolute bottom-[23px] px-[95px]">
                <ChatInput />
            </div>
        </div>
    );
}

export default ChatContainer;