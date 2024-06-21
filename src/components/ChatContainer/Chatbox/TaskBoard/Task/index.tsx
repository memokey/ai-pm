import React from "react";
import Image from "next/image";
import { CONSTANTS } from "@/config/constants";
import { STATE_LINKS } from "@/data/chatData";
import Badge, { BadgeType } from "@/components/Common/Badges/Badge";
import { DownIcon, EditIcon, SubTaskIcon } from "@/components/Icons";
import { useDispatch } from "react-redux";
import { setTaskDetailModal, updateTaskExpand } from "@/redux/slices/taskSlice";
import { UpIcon } from "@/components/Icons/UpIcon";
import { STATUS_ICONS } from "@/data/global";

export type TaskType = {
    taskId?: string;
    cost?: number;
    description: string;
    title: string;
    worker?: string;
    status: string;
    isExpand?: boolean;
    lenSubTasks?: number;
    assignee?: string;
    price?: any;
};

const Task = (props: any) => {
    const dispatch = useDispatch();

    return (
        <li className="w-full py-[8px] px-[20px] border border-base-200 border-b flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 py-[4px]">
                {STATUS_ICONS[props.status]}
                <span className="rounded-[6px] text-success bg-[#272727] px-[9px] py-[2px]">
                    {props.status}
                </span>
                {!!props.lenSubTasks && (
                    <div className="rounded-[4px] bg-[#272727] flex gap-1 items-center py-[2px] px-2 mx-3">
                        <SubTaskIcon />
                        <span>{props.lenSubTasks}</span>
                    </div>
                )}
                <span>{props.title}</span>
                {!!props.cost &&
                    (props.status === CONSTANTS.TASK_CONFIRMED ||
                        props.status === CONSTANTS.TASK_IN_PROGRESS) && (
                        <Badge data={props.cost} styles="border-none" />
                    )}
            </div>
            <div className="flex gap-6 text-base-300 hover:text-base-content items-center">
                <div className="flex gap-2 items-center">
                    <span className="rounded-[6px] bg-[#272727] px-[9px] py-[2px] mr-5">
                        {"Design"}
                    </span>
                    <Image
                        src={props.assignee}
                        className="rounded-full"
                        alt="Avatar"
                        width={24}
                        height={24}
                    />
                    <div>James</div>
                </div>
                <div
                    className="p-1 hover:bg-[#202020] rounded-[2px] cursor-pointer"
                    onClick={() => {
                        dispatch(updateTaskExpand({ taskId: props.taskId }));
                    }}
                >
                    {props.isExpand !== undefined && (
                        <>{props.isExpand ? <UpIcon /> : <DownIcon />}</>
                    )}
                </div>
            </div>
        </li>
    );
};

export default Task;
