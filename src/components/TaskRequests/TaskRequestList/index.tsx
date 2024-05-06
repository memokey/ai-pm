import { DEFAULT_TASKS } from "@/data/global";
import React from "react";
import TaskRequestItem from "./TaskRequestItem";
import { useAppSelector } from "@/redux/hooks";

const TaskRequestList = () => {
    const { listRequests } = useAppSelector((state) => state.task);
    return (
        <div className="grid gap-[12px]">
            {listRequests.map((request, index) => (
                <TaskRequestItem key={index} {...request} />
            ))}
        </div>
    );
};

export default TaskRequestList;
