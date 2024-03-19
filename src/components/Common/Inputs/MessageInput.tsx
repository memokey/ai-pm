import React from "react";
import { SendButton } from "../Buttons";
import { CloudArrowUpIcon, MicIcon } from "@/components/Icons";

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
            <SendButton />
        </label>
    );
}

export default MessageInput;