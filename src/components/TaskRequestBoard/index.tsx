import { DEFAULT_COLS, DEFAULT_TASKS } from "@/data/global";
import { ColumnType, TaskType } from "@/data/types/type";
import React, { useEffect, useMemo, useState } from "react";
import StatusBoxRequest from "./StatusBoxRequest";
import { useAppSelector } from "@/redux/hooks";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
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
    const { taskId, taskerModal, requests } = useAppSelector(state => ({
        activeDetail: state.task.activeDetail,
        taskId: state.task.taskId,
        taskerModal: state.tasker.taskerModal,
        requests: state.task.requests,
    }));

    const columnsId = useMemo(() => columns.map((col: ColumnType) => col.id), [columns]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    useEffect(() => {
        setTasks(JSON.parse(JSON.stringify(requests)));
    }, [requests])

    // const onDragStart = (event: DragStartEvent) => {
    //     if (event.active.data.current?.type === "Column") {
    //         setActiveColumn(event.active.data.current.column);
    //         return;
    //       }
      
    //       if (event.active.data.current?.type === "Task") {
    //         setActiveTask(event.active.data.current.task);
    //         return;
    //       }
    // }    

    // const onDragEnd = (event: DragEndEvent) => {
    //     setActiveColumn(null);
    //     setActiveTask(null);

    //     const { active, over } = event;
    //     if (!over) return;

    //     const activeId = active.id;
    //     const overId = over.id;

    //     if (activeId === overId) return;

    //     const isActiveAColumn = active.data.current?.type === "Column";
    //     if (!isActiveAColumn) return;

    //     console.log("DRAG END");

    //     setColumns((columns) => {
    //     const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

    //     const overColumnIndex = columns.findIndex((col) => col.id === overId);

    //     return arrayMove(columns, activeColumnIndex, overColumnIndex);
    //     });
    // }
    
    // const onDragOver = (event: DragOverEvent) => {
    //     const { active, over } = event;
    //     if (!over) return;

    //     const activeId = active.id;
    //     const overId = over.id;

    //     if (activeId === overId) return;

    //     const isActiveATask = active.data.current?.type === "Task";
    //     const isOverATask = over.data.current?.type === "Task";

    //     if (!isActiveATask) return;

    //     // Im dropping a Task over another Task
    //     if (isActiveATask && isOverATask) {
    //     setTasks((tasks) => {
    //         const activeIndex = tasks.findIndex((t) => t.id === activeId);
    //         const overIndex = tasks.findIndex((t) => t.id === overId);

    //         if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
    //         // Fix introduced after video recording
    //         tasks[activeIndex].columnId = tasks[overIndex].columnId;
    //         return arrayMove(tasks, activeIndex, overIndex - 1);
    //         }

    //         return arrayMove(tasks, activeIndex, overIndex);
    //     });
    //     }

    //     const isOverAColumn = over.data.current?.type === "Column";

    //     // Im dropping a Task over a column
    //     if (isActiveATask && isOverAColumn) {
    //         setTasks((tasks) => {
    //             const activeIndex = tasks.findIndex((t) => t.id === activeId);

    //             tasks[activeIndex].columnId = overId;
    //             console.log("DROPPING TASK OVER COLUMN", { activeIndex });
    //             return arrayMove(tasks, activeIndex, activeIndex);
    //         });
    //     }
    // }

    useEffect(() => {
        const detailIndex = requests.findIndex((t) => t.id == taskId);
        if(detailIndex != -1) {
            setTaskDetail(JSON.parse(JSON.stringify(requests[detailIndex])))
        }
    }, [taskId, requests])

    return (
        <div className="relative pt-6 px-4 w-[calc(100vw-240px)] h-[calc(100vh-128px)]">
            <div className="flex gap-4">
            <DndContext
                sensors={sensors}
                // onDragStart={onDragStart}
                // onDragEnd={onDragEnd}
                // onDragOver={onDragOver}
            >
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
                            tasks={tasks.filter((task: TaskType) => task.columnId === col.id)}
                        />
                    ))}
                </SortableContext>
            </DndContext>
            </div>
            {taskerModal && taskDetail && (
                <div className="absolute w-[450px] h-[calc(100vh-64px)] top-0 right-0 flex">
                    <div className="w-[450px] h-[calc(100vh-64px)] bg-[#191919] border-[#343434] border-l">
                        <RequestDetailBox 
                            task={taskDetail}
                        />
                    </div>
                </div>
            )}
            {/* {taskerModal && !!taskDetail && (
                <TaskerInterfaceModal 
                    title={taskDetail.title}
                    task={taskDetail}
                />
            )} */}
        </div>
    );
}

export default TaskRequestBoard;