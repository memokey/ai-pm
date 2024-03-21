import { CONSTANTS } from "@/config/constants";
import { TMP_TASKS } from "@/data/chatData";
import React from "react";
import Task from "./Task";

const TaskBoard = () => {
    return (
        <ul className="w-full border border-base-200 rounded-[8px] overflow-hidden">
            {TMP_TASKS.map((task, index) => (
                <Task 
                    key={index}
                    {...task}
                />
            ))}
        </ul>
    );
}

export default TaskBoard;