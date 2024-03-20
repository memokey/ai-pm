import React from "react";

const Chatbox = () => {
    return (
        <div className="grid gap-4">
            <h1 className="text-[48px] font-[400] traking-tighter">
                Hello, 
                <span className="name-linear font-[700]">Thomas</span>
                <br />
                Write down any task?
            </h1>
            <p className="text-[20px] font-[400] leading-[30px] text-base-300">Please Write down task along with description for AI so we can
generate detail report for you</p>
        </div>
    );
}

export default Chatbox;