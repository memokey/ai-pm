import { CloudArrowUpIcon, MicIcon, PaperAirplaneIcon } from "@/components/Icons";
import React from "react";

const MessageInput = () => {
    return (
        <label className="input input-bordered flex items-center gap-2">
            <div className="cursor-pointer hover:text-primary opacity-70">
                <CloudArrowUpIcon />
            </div>
            <input type="text" className="grow" placeholder="Send a message" />
            <div className="cursor-pointer hover:text-primary opacity-70">
                <MicIcon />
            </div>
            <div className="cursor-pointer hover:text-primary opacity-70">
                <PaperAirplaneIcon />
            </div>
        </label>
    );
}

export default MessageInput;