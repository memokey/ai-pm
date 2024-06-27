import { CONSTANTS } from "@/config/constants";
import React, { ReactNode } from "react";
import Task from "./Task";
import { TaskType } from "@/data/types/type";
import { DEFAULT_COLS_BY_ID } from "@/data/global";

type TaskBoardType = {
  tasks: any[];
};

const fetchTasks = (tasks: TaskType[]): ReactNode => {
  return tasks.map((task: TaskType) => {
    const parentTaskIndex = tasks.findIndex((t) => t.id == task.parentId);
    const subTasks = tasks.filter((t) => t.parentId == task.id);
    if (parentTaskIndex == -1) {
      let tasksContent;
      if (!!subTasks && subTasks.length != 0) {
        tasksContent = (
          <div key={task.id}>
            <Task
              key={task.id}
              taskId={task.id}
              description={task.description}
              lenSubTasks={subTasks.length}
              title={task.title}
              status={DEFAULT_COLS_BY_ID[task.columnId]}
              assignee={"/tmp/avatars/assignee.png"}
              isExpand={subTasks.length !== 0 && task.isExpand}
            />
            {task.isExpand && (
              <div>
                {tasksContent}
                <div className="ml-[20px]">{fetchTasks(subTasks)}</div>
              </div>
            )}
          </div>
        );
      } else {
        tasksContent = (
          <Task
            key={task.id}
            taskId={task.id}
            description={task.description}
            lenSubTasks={subTasks.length}
            title={task.title}
            assignee={"/tmp/avatars/assignee.png"}
            status={DEFAULT_COLS_BY_ID[task.columnId]}
          />
        );
      }
      return tasksContent;
    }
  });
};

const TaskBoard = (props: TaskBoardType) => {
  return (
    <ul className="w-full border border-base-200 rounded-[8px] overflow-hidden">
      {props.tasks && fetchTasks(props.tasks)}
    </ul>
  );
};

export default TaskBoard;
