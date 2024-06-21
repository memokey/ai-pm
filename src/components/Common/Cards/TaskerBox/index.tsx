import { EditIcon, FullScreenIcon } from "@/components/Icons";
import React, { ReactNode } from "react";

export type TaskerBoxType = {
    title: string;
    children: ReactNode;
    onEdit?: (index: any) => void;
};

const TaskerBox = (props: TaskerBoxType) => {
    return (
        <div className="border border-base-200 bg-[#191919] rounded-[10px] w-[calc(35vw-24px)] overflow-hidden">
            <div className="flex justify-between items-center py-3 px-4 border-b border-base-200">
                <div className="text-base-300 text-[12px] font-400">
                    {props.title}
                </div>
                <div className="flex gap-2">
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            if (props.onEdit) {
                                props.onEdit((prev: boolean) => {
                                    return !prev;
                                });
                            }
                        }}
                    >
                        <EditIcon />
                    </div>
                    <div className="cursor-pointer">
                        <FullScreenIcon />
                    </div>
                </div>
            </div>
            <div className="">{props.children}</div>
        </div>
    );
};

export default TaskerBox;
