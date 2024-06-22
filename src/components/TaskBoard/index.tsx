"use client";

import React, { useEffect, useMemo, useState } from "react";
import StatusBox from "./StatusBox";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { ColumnType, TaskType } from "@/data/types/type";
import { DEFAULT_COLS, DEFAULT_TASKS } from "@/data/global";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveDetail, setIsFeedback } from "@/redux/slices/taskSlice";
import TaskDetailBox from "./TaskDetailBox";
import {
  FeedbackModal,
  TaskerInterfaceModal,
  AITaskInterfaceModal,
} from "../Common/Modals";
const TaskBoard = () => {
  const dispatch = useAppDispatch();
  const [columns, setColumns] = useState<ColumnType[]>(DEFAULT_COLS);
  const columnsId = useMemo(
    () => columns.map((col: ColumnType) => col.id),
    [columns]
  );
  const [boardTasks, setBoardTasks] = useState<any[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [taskDetail, setTaskDetail] = useState<TaskType | null>(null);

  const { activeDetail, taskId, executeModal } = useAppSelector(
    (state) => state.task
  );

  const { tasks, isFeedback } = useAppSelector((state) => state.task);

  useEffect(() => {
    setBoardTasks(JSON.parse(JSON.stringify(tasks)));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    const detailIndex = tasks.findIndex((t) => t.id == taskId);
    if (detailIndex != -1) {
      setTaskDetail(tasks[detailIndex]);
    }
  }, [taskId, tasks]);

  useEffect(() => {
    dispatch(setIsFeedback(false));
  }, []);

  return (
    <div className="relative pt-6 px-4 w-[calc(100vw-240px)] h-[calc(100vh-128px)]">
      <div className="flex gap-4">
        <DndContext sensors={sensors}>
          <SortableContext items={columnsId}>
            {DEFAULT_COLS.map((col: ColumnType) => (
              <StatusBox
                key={col.id}
                column={col}
                deleteColumn={() => {}}
                updateColumn={() => {}}
                createTask={() => {}}
                deleteTask={() => {}}
                updateTask={() => {}}
                tasks={boardTasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      {/* Task Detail in Right Sidebar */}
      {!!activeDetail && (
        <div className="absolute w-[450px] h-[calc(100vh-64px)] top-0 right-0 flex">
          <div className="w-[450px] h-[calc(100vh-64px)] bg-[#191919] border-[#343434] border-l">
            {!!taskDetail && <TaskDetailBox task={taskDetail} />}
          </div>
        </div>
      )}
      {executeModal && !!activeDetail && !!taskDetail && (
        <AITaskInterfaceModal
          title={taskDetail.title}
          task={taskDetail}
          tasks={boardTasks}
        />
      )}
      {isFeedback && (
        <FeedbackModal
          title="Leave a Feedback"
          hidden={taskDetail ? taskDetail.id : ""}
        />
      )}
    </div>
  );
};

export default TaskBoard;
