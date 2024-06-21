import React, { ReactNode, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import StatusTitle from "./StatusTitle";
import TaskBox from "./TaskBox";
import { ColumnType, TaskType } from "@/data/types/type";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskCard from "./TaskBox/TaskCard";
import { DEFAULT_TASKS } from "@/data/global";

export type StatusBoxType = {
    column: ColumnType;
    tasks: any;
    deleteColumn?: any;
    updateColumn?: any;
    createTask?: any;
    deleteTask?: any;
    updateTask?: any;
};

const StatusBox = (props: StatusBoxType) => {
    const tasksIds = useMemo(() => {
        return props.tasks.map((task: TaskType) => task.id);
    }, [props.tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.column.id,
        data: {
            type: "Column",
            column: props.column,
        },
        disabled: false,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const fetchTasks = (tasks: TaskType[]): ReactNode => {
        return tasks.map((task: TaskType) => {
            const parentTaskIndex = tasks.findIndex(
                (t) => t.id == task.parentId
            );
            if (parentTaskIndex == -1) {
                let tasksContent = (
                    <TaskCard
                        key={task.id}
                        task={task}
                        deleteTask={props.deleteTask}
                        updateTask={props.updateTask}
                    />
                );
                const subTasks = tasks.filter((t) => t.parentId == task.id);
                if (!!subTasks && subTasks.length != 0) {
                    tasksContent = (
                        <div key={task.id}>
                            {tasksContent}
                            <div className="ml-[20px]">
                                {fetchTasks(subTasks)}
                            </div>
                        </div>
                    );
                }
                return tasksContent;
            }
        });
    };

    return (
        <div ref={setNodeRef} style={style} className="grid w-[340px]">
            <StatusTitle
                stateIcon={props.column.icon}
                title={props.column.title}
            />
            <div className="bg-[#1C1C1C] rounded-[12px] p-2 h-[calc(100vh-158px)] overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {fetchTasks(props.tasks)}
                </SortableContext>
            </div>
        </div>
    );
};

export default StatusBox;
