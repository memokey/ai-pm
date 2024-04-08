import { FullScreenIcon } from "@/components/Icons";
import React, { ReactNode } from "react";

export type TaskerBoxType = {
    title: string;
    children: ReactNode;
}

const TaskerBox = (props: TaskerBoxType) => {
    return (
        <div className="border border-base-200 bg-[#191919] rounded-[10px] w-[calc(35vw-24px)] overflow-hidden">
            <div className="flex justify-between items-center py-3 px-4 border-b border-base-200">
                <div className="text-base-300 text-[12px] font-400">
                    {props.title}
                </div>
                <div className="cursor-pointer">
                    <FullScreenIcon />
                </div>
            </div>
            <div className="">
                {props.children}
            </div>
        </div>
    );
}

export default TaskerBox;