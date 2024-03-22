import React from "react";
import Image from "next/image";
import { CONSTANTS } from "@/config/constants";
import { STATE_LINKS } from "@/data/chatData";
import Badge, { BadgeType } from "@/components/Common/Badges/Badge";

export type TaskType = {
    title: string;
    description: string;
    status: number;
    assignee: string;
    price?: BadgeType;
}

const Task = (props: TaskType) => {
    return (
        <li className="w-full py-[12px] px-[20px] border border-base-200 border-b flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
                <Image src={STATE_LINKS[props.status]} className="rounded-full" alt="Avatar" width={13} height={13} />
                <span>{props.title}</span>
                {props.status === CONSTANTS.TASK_CONFIRMED && (
                    <span className="rounded-[6px] text-success bg-[#272727] px-[9px] py-[6px]">Confirmed</span>
                )}
                {props.status === CONSTANTS.TASK_IN_PROGRESS && (
                    <span className="rounded-[6px] text-primary bg-[#272727] px-[9px] py-[6px]">In Progress</span>
                )}
                {props.status === CONSTANTS.TASK_WAITING && (
                    <span className="rounded-[6px] bg-[#272727] px-[9px] py-[6px]">Waiting...</span>
                )}
                {!!props.price && (props.status === CONSTANTS.TASK_CONFIRMED || props.status === CONSTANTS.TASK_IN_PROGRESS) && (
                    <Badge 
                      {...props.price}  
                      styles="border-none"
                    />
                )}
            </div>
            <Image src={props.assignee} className="rounded-full" alt="Avatar" width={24} height={24} />
        </li>
    );
}

export default Task;