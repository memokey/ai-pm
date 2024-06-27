import { DEFAULT_COLS, DEFAULT_TASKS } from "@/data/global";
import { ColumnType, TaskType } from "@/data/types/type";
import React, { useEffect, useMemo, useState } from "react";
import StatusBoxRequest from "./StatusBoxRequest";
import { useAppSelector } from "@/redux/hooks";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { TaskerInterfaceModal } from "../Common/Modals";
import { setTaskerModal } from "@/redux/slices/taskerSlice";
import RequestDetailBox from "./RequestDetailBox";

const TaskRequestBoard = () => {
    const [columns, setColumns] = useState<ColumnType[]>(DEFAULT_COLS);
    const [tasks, setTasks] = useState<any[]>([]);
    const [activeTask, setActiveTask] = useState<any>(null);
    const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
    const [taskDetail, setTaskDetail] = useState<TaskType | null>(null);
    const { taskId, taskerModal, executeModal, requests } = useAppSelector(
        (state) => ({
            activeDetail: state.task.activeDetail,
            taskId: state.task.taskId,
            taskerModal: state.tasker.taskerModal,
            requests: state.task.requests,
            executeModal: state.task.executeCodeModal,
        })
    );

    const columnsId = useMemo(
        () => columns.map((col: ColumnType) => col.id),
        [columns]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    useEffect(() => {
        setTasks(JSON.parse(JSON.stringify(requests)));
    }, [requests]);

    useEffect(() => {
        const detailIndex = requests.findIndex((t) => t.id == taskId);
        if (detailIndex != -1) {
            setTaskDetail(JSON.parse(JSON.stringify(requests[detailIndex])));
        }
    }, [taskId, requests]);

    return (
        <div className="relative pt-6 px-4 w-[calc(100vw-240px)] h-[calc(100vh-128px)]">
            <div className="flex gap-4">
                <DndContext sensors={sensors}>
                    <SortableContext items={columnsId}>
                        {DEFAULT_COLS.map((col: ColumnType) => (
                            <StatusBoxRequest
                                key={col.id}
                                column={col}
                                deleteColumn={() => {}}
                                updateColumn={() => {}}
                                createTask={() => {}}
                                deleteTask={() => {}}
                                updateTask={() => {}}
                                tasks={tasks.filter(
                                    (task: TaskType) => task.columnId === col.id
                                )}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
            {taskerModal && taskDetail && (
                <div className="absolute w-[450px] h-[calc(100vh-64px)] top-0 right-0 flex">
                    <div className="w-[450px] h-[calc(100vh-64px)] bg-[#191919] border-[#343434] border-l">
                        <RequestDetailBox task={taskDetail} />
                    </div>
                </div>
            )}
            {executeModal && !!taskDetail && (
                <TaskerInterfaceModal
                    title={taskDetail.title}
                    task={taskDetail}
                />
            )}
        </div>
    );
};

export default TaskRequestBoard;
