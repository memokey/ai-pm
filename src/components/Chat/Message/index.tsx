import { RoundedSquareIcon } from "@/components/Icons";
import React from "react";
import Clipboard from "./Clipboard";


export type MessageType = {
    sender: Boolean;
    content: string;
}
const Message = (props: MessageType) => {
    return (
        <div className={`card w-[99%] py-0 ${props.sender ? 'bg-base-300 shadow-xl': 'bg-neutral text-neutral-content'}`}>
            <div className="card-body py-6">
                <div>{props.content}</div>
                <div className="flex gap-2">
                    <div className="cursor-pointer hover:text-primary">
                        <RoundedSquareIcon />
                    </div>
                    <Clipboard
                        clipboard={props.content} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Message;