import { StatusBoxType } from "@/components/TaskBoard/StatusBox";
import StatusTitle from "@/components/TaskBoard/StatusBox/StatusTitle";
import { TaskType } from "@/data/types/type";
import React, { useMemo } from "react";
import RequestBox from "../RequestBox";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const StatusBoxRequest = (props: StatusBoxType) => {
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
            className="grid w-[350px]"
        >
            <StatusTitle 
                stateIcon={props.column.icon}
                title={props.column.title}
            />
            <div className="bg-[#1C1C1C] rounded-[12px] p-2 h-[calc(100vh-150px)] overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {props.tasks.map((task: TaskType) => (
                        <RequestBox
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

export default StatusBoxRequest;