import { DEFAULT_TASKS } from "@/data/global";
import React from "react";
import TaskRequestItem from "./TaskRequestItem";

const TaskRequestList = () => {
    return (
        <div className="grid gap-[12px]">
            {DEFAULT_TASKS.map((task, index) => (
                <TaskRequestItem 
                    key={index}
                    {...task}
                />
            ))}
        </div>
    );
}

export default TaskRequestList;