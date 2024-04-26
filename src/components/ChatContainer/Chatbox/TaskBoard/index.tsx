import { CONSTANTS } from "@/config/constants";
import { TMP_TASKS } from "@/data/chatData";
import React from "react";
import Task from "./Task";

type TaskBoardType = {
    tasks: any[];
}

const TaskBoard = (props: TaskBoardType) => {
    return (
        <ul className="w-full border border-base-200 rounded-[8px] overflow-hidden">
            {props.tasks && props.tasks.map((task: any, index: number) => (
                <Task 
                    key={index}
                    {...task}
                    status={CONSTANTS.TASK_WAITING}
                />
            ))}
        </ul>
    );
}

export default TaskBoard;