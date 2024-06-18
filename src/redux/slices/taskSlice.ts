'use client'

import { CONSTANTS } from '@/config/constants';
import { DEFAULT_COLS_BY_ID, DEFAULT_TASKS } from '@/data/global';
import { Id, TaskType } from '@/data/types/type';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export interface TaskState {
    activeDetail: Boolean;
    taskDetailModal: Boolean;
    tasks: any[];
    requests: any[];
    listRequests: any[];
    taskId: String;
    isFeedback: boolean;
}

const initialState: TaskState = {
    activeDetail: false,
    taskDetailModal: false,
    tasks: [],
    requests: [],
    listRequests: [],
    taskId: "0",
    isFeedback: false,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setActiveDetail: (state, action: PayloadAction<Boolean>) => {
            state.activeDetail = action.payload;
        },
        setTaskId: (state, action: PayloadAction<String>) => {
            state.taskId = action.payload;
        },
        setTaskDetailModal: (state, action: PayloadAction<Boolean>) => {
            state.taskDetailModal = action.payload;
        },
        setTasks: (state, action: PayloadAction<any[]>) => {
            state.tasks = action.payload;
        },
        setTaskRequests: (state, action: PayloadAction<any[]>) => {
            state.requests = action.payload;
        },
        setTaskListRequests: (state, action: PayloadAction<any[]>) => {
            state.listRequests = action.payload;
        },
        setIsFeedback: (state, action: PayloadAction<boolean>) => {
            state.isFeedback = action.payload;
        },
        updateTask: (state, action: PayloadAction<any>) => {
            const { taskId, task } = action.payload;
            let renderedTasks = current(state).tasks.map((_task) => {
                if(_task.id == taskId) {
                    return {
                        id: task._id,
                        columnId: task.status,
                        parentId: task.parent_id,
                        title: task.title,
                        description: task.description,
                        taskProgress: 0,
                        created: task.created_at || "Yesterday",
                        lastUpdated: task.updated_at || "Just Now",
                        properties: {
                            cost: task.cost,
                            status: DEFAULT_COLS_BY_ID[task.status],
                            assignees: !!task.assignee ? [task.assignee] : [],
                            submission: task.submission || {},
                            tasker_feedback: task.tasker_feedback,
                            priority: 0,
                            dueDate: "Yesterday",
                            agents: [],
                            humans: [],
                            messages: task.chat.length,
                            shares: 1,
                        },
                    };
                } else {
                    return {
                        ..._task
                    };
                }
            });
            state.tasks = JSON.parse(JSON.stringify(renderedTasks));
        },
        updateRequest: (state, action: PayloadAction<any>) => {
            const { taskId, task } = action.payload;
            let renderedRequests = current(state).requests.map((request) => {
                if(request.id == taskId) {
                    return {
                        id: task._id,
                        columnId: task.status,
                        parentId: task.parentId,
                        title: task.title,
                        description: task.description,
                        cost: task.cost || 0,
                        taskProgress: 0,
                        created: task.createdAt || "Yesterday",
                        lastUpdated: task.updatedAt || "Just Now",
                        properties: {
                            status: DEFAULT_COLS_BY_ID[task.status],
                            assignees: [],
                            requester: task.requester,
                            priority: task.priority,
                            tasker_feedback: task.tasker_feedback,
                            submission: task.submission || {},
                            dueDate: task.dueDate || "Not Assigned",
                            agents: [],
                            humans: [],
                            messages: 0,
                            shares: 1
                        }
                    }
                } else {
                    return {
                        ...request
                    }
                }
            })
            state.requests = JSON.parse(JSON.stringify(renderedRequests));
        },
    },
})

export const {
    setActiveDetail,
    setTaskDetailModal,
    setTaskId,
    setTasks,
    setTaskRequests,
    setTaskListRequests,
    updateTask,
    updateRequest,
    setIsFeedback
} = taskSlice.actions

export default taskSlice.reducer
