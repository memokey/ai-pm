import React, { ReactNode, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import StatusTitle from "./StatusTitle";
import TaskBox from "./TaskBox";
import { ColumnType, TaskType } from "@/data/types/type";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskCard from "./TaskBox/TaskCard";

export type StatusBoxType = {
    column: ColumnType;
    tasks: any;
    deleteColumn?: any;
    updateColumn?: any;
    createTask?: any;
    deleteTask?: any;
    updateTask?: any;
}

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

    return (
        <div 
            ref={setNodeRef}
            style={style}
            className="grid w-[290px]"
        >
            <StatusTitle 
                stateIcon={props.column.icon}
                title={props.column.title}
            />
            <div className="bg-[#1C1C1C] rounded-[12px] p-2 h-[calc(100vh-150px)] overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {props.tasks.map((task: TaskType) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={props.deleteTask}
                            updateTask={props.updateTask}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}   

export default StatusBox;