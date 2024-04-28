import { DEFAULT_COLS_BY_ID } from "@/data/global";

export const convertTasks = (tasks: any[], currentTasks: any[] = []) => {
    for(const task of tasks) {
        currentTasks.push({
            id: task.id,
            columnId: task.status,
            parentId: task.parent_id,
            title: task.title,
            description: task.description,
            taskProgress: 0,
            created: task.created_at || "Yesterday",
            lastUpdated: task.updated_at || "Just Now",
            properties: {
                status: DEFAULT_COLS_BY_ID[task.status],
                assignees: [],
                priority: 0,
                dueDate: "Yesterday",
                agents: [],
                humans: [],
                messages: task.chat.length,
                shares: 1
            }
        })
        if(task.tasks.length != 0) {
            convertTasks(task.tasks, currentTasks);
        }
    }
}