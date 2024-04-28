import { DEFAULT_TASKS } from "@/data/global";
import React from "react";
import TaskRequestItem from "./TaskRequestItem";
import { useAppSelector } from "@/redux/hooks";

const TaskRequestList = () => {
    const { requests } = useAppSelector(state => state.task);
    return (
        <div className="grid gap-[12px]">
            {requests.map((request, index) => (
                <TaskRequestItem 
                    key={index}
                    {...request}
                />
            ))}
        </div>
    );
}

export default TaskRequestList;