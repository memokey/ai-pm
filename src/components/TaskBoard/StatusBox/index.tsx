import React, { ReactNode, useMemo, useState } from "react";
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

  const [expandedTasks, setExpandedTasks] = useState<{
    [key: string]: boolean;
  }>({});

  const handleExpand = (taskId: string) => {
    setExpandedTasks((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const FetchTasks = (tasks: TaskType[]): ReactNode => {
    return tasks.map((task: TaskType) => {
      const parentTaskIndex = tasks.findIndex((t) => t.id == task.parentId);
      const subTasks = tasks.filter((t) => t.parentId == task.id);
      const isExpand = expandedTasks[task.id] || false;
      if (parentTaskIndex == -1) {
        let tasksContent = (
          <div key={task.id} onClick={() => handleExpand(task.id)}>
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={props.deleteTask}
              updateTask={props.updateTask}
              subTasks={subTasks}
              handleExpand={handleExpand}
              isExpand={isExpand}
            />
          </div>
        );
        if (!!subTasks && subTasks.length != 0 && isExpand) {
          tasksContent = (
            <div
              key={task.id}
              className={`transition-all duration-300 overflow-hidden ${
                isExpand ? "h-auto visible" : "h-0 invisible"
              }`}
            >
              {tasksContent}
              <div className="ml-[20px]">{FetchTasks(subTasks)}</div>
            </div>
          );
        }
        return tasksContent;
      }
    });
  };

  return (
    <div ref={setNodeRef} style={style} className="grid w-[340px]">
      <StatusTitle stateIcon={props.column.icon} title={props.column.title} />
      <div className="bg-[#1C1C1C] rounded-[12px] p-2 h-[calc(100vh-158px)] overflow-y-auto">
        <SortableContext items={tasksIds}>
          {FetchTasks(props.tasks)}
        </SortableContext>
      </div>
    </div>
  );
};

export default StatusBox;
