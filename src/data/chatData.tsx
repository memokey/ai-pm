import { TaskType } from "@/components/ChatContainer/Chatbox/TaskBoard/Task";
import { MangoIcon } from "@/components/Icons/MangoIcon";
import { CONSTANTS } from "@/config/constants";

export const TMP_TASKS: TaskType[] = [
    {
        title: 'UI/UX -> Human',
        description: '',
        status: CONSTANTS.TASK_CONFIRMED,
        assignee: '/tmp/avatars/assignee.png',
        price: {
            icon: <MangoIcon />,
            title: 'Expense',
            data: '30$'
        }
    },
    {
        title: 'Frontend -> AI',
        description: '',
        status: CONSTANTS.TASK_IN_PROGRESS,
        assignee: '/images/avatars/bot.png',
        price: {
            icon: <MangoIcon />,
            title: 'Expense',
            data: '30$'
        }
    },
    {
        title: 'Reviewers (Human from Berkeley)',
        description: '',
        status: CONSTANTS.TASK_WAITING,
        assignee: '/tmp/avatars/assignee.png'
    },
    {
        title: 'Reviewers (Human from Berkeley)',
        description: '',
        status: CONSTANTS.TASK_WAITING,
        assignee: '/tmp/avatars/assignee.png'
    },
    {
        title: 'Reviewers (Human from Berkeley)',
        description: '',
        status: CONSTANTS.TASK_WAITING,
        assignee: '/tmp/avatars/assignee.png'
    },
];

export const STATE_LINKS: string[] = [
    '/images/chat/tasks/in_progress.png',
    '/images/chat/tasks/assign.png',
    '/images/chat/tasks/pendding.png',
];