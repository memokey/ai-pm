import React from "react";
import Image from "next/image";
import { CONSTANTS } from "@/config/constants";
import { STATE_LINKS } from "@/data/chatData";

export type TaskType = {
    title: string;
    description: string;
    status: number;
    assignee: string;
}

const Task = (props: TaskType) => {
    return (
        <li className="w-full py-[12px] px-[20px] border border-base-200 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Image src={STATE_LINKS[props.status]} className="rounded-full" alt="Avatar" width={13} height={13} />
                <span>{props.title}</span>
                {props.status === CONSTANTS.TASK_CONFIRMED && (
                    <span className="rounded-[6px] border border-success bg-[#4c4c4c] px-[9px] py-[6px]">Confirmed</span>
                )}
                {props.status === CONSTANTS.TASK_IN_PROGRESS && (
                    <span className="rounded-[6px] border border-secondary bg-[#4c4c4c] px-[9px] py-[6px]">In Progress</span>
                )}
                {props.status === CONSTANTS.TASK_WAITING && (
                    <span className="rounded-[6px] bg-[#4c4c4c] px-[9px] py-[6px]">Waiting...</span>
                )}
            </div>
            <Image src={props.assignee} className="rounded-full" alt="Avatar" width={24} height={24} />
        </li>
    );
}

export default Task;