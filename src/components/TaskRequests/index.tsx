import React from "react";
import TaskRequestList from "./TaskRequestList";

const TaskRequests = () => {
    return (
        <div className="py-[24px] px-[139px] w-full h-[calc(100vh-64px)] overflow-y-auto">
            <TaskRequestList />
        </div>
    );
}

export default TaskRequests;