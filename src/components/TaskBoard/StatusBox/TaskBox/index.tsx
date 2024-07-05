import { Id, TaskType } from "@/data/types/type";
import { SortableContext } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";

type TaskBoxType = {
    tasks: TaskType[];
    deleteTask: any;
    updateTask: any;
};

const TaskBox = (props: TaskBoxType) => {
    const tasksIds = useMemo(() => {
        return props.tasks.map((task: TaskType) => task.id);
    }, [props.tasks]);
    return (
        <div className="bg-[#1C1C1C] rounded-[12px] p-2 h-[calc(100vh-158px)] overflow-y-auto">
            <SortableContext items={tasksIds}>
                {props.tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        subTasks={[]}
                        deleteTask={props.deleteTask}
                        updateTask={props.updateTask}
                    />
                ))}
            </SortableContext>
        </div>
    );
};

export default TaskBox;
