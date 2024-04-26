import React from "react";
import Image from "next/image";
import { CONSTANTS } from "@/config/constants";
import { STATE_LINKS } from "@/data/chatData";
import Badge, { BadgeType } from "@/components/Common/Badges/Badge";
import { EditIcon } from "@/components/Icons";
import { useDispatch } from "react-redux";
import { setTaskDetailModal } from "@/redux/slices/taskSlice";

export type TaskType = {
    cost?: number;
    description: string;
    title: string;
    worker?: string;
    status: number;
    assignee?: string;
    price?: any;
}

const Task = (props: any) => {
    const dispatch = useDispatch();
    return (
        <li className="w-full py-[12px] px-[20px] border border-base-200 border-b flex items-center justify-between cursor-pointer gap-6">
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
                {!!props.cost && (props.status === CONSTANTS.TASK_CONFIRMED || props.status === CONSTANTS.TASK_IN_PROGRESS) && (
                    <Badge 
                      data={props.cost}  
                      styles="border-none"
                    />
                )}
            </div>
            <div className="flex gap-6 text-base-300 hover:text-base-content">
                {/* <Image src={props.assignee} className="rounded-full" alt="Avatar" width={24} height={24} /> */}
                <div className="" onClick={() => {}}>
                    <EditIcon />
                </div>
            </div>
        </li>
    );
}

export default Task;