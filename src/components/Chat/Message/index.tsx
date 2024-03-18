import React from "react";


export type MessageType = {
    sender: Boolean;
    content: string;
}
const Message = (props: MessageType) => {
    return (
        <div className={`card w-96 ${props.sender ? 'bg-base-300 shadow-xl': 'bg-neutral text-neutral-content'}`}>
            <div className="card-body">
                <p>{props.content}</p>
            </div>
        </div>
    );
}

export default Message;