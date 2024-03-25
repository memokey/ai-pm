import { PlusIcon, ThreeDotIcon } from "@/components/Icons";
import React, { ReactNode } from "react";

export type StatusTitleType = {
    stateIcon: ReactNode;
    title: string;
    onAdd?: any;
    onSetting?: any;
}

const StatusTitle = (props: StatusTitleType) => {
    return (
        <div className="flex p-2 justify-between items-center">
            <div className="flex gap-2 items-center">
                {props.stateIcon}
                <h2 className="text-[14px] font-400 text-base-content">{props.title}</h2>
            </div>
            <div className="flex gap-2 gap-2">
                <div className="cursor-pointer">
                    <PlusIcon />
                </div>
                <div className="cursor-pointer">
                    <ThreeDotIcon />
                </div>
            </div>
        </div>
    );
}

export default StatusTitle;