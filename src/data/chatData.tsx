import { MessageType } from "@/components/Chat/Message";
import { TaskType } from "@/components/ChatContainer/Chatbox/TaskBoard/Task";
import { CONSTANTS } from "@/config/constants";

export const MESSAGES: MessageType[] = [
    {
        sender: false,
        content: `How can you help me to developer AI project management tools?`
    },
    {
        sender: true,
        content: `Developing AI project management tools involves various stages, from conceptualization to development and implementation. Here's how I can assist you through each phase:
        1. Conceptualization and Planning
        Idea Generation: Suggest innovative features based on current AI and project management trends.
        Requirements Gathering: Help you formulate functional and non-functional requirements for your tool.
        Scope Definition: Assist in defining the scope of your AI project management tool, including the identification of potential limitations and challenges.
        2. Design
        Architecture Design: Provide insights on designing the architecture of your tool, including choosing between a monolithic and microservices architecture.
        UI/UX Design: Offer advice on user interface and user experience best practices to make your tool intuitive and user-friendly.`
    },
    {
        sender: false,
        content: `How can you help me to developer AI project management tools?`
    },
    {
        sender: true,
        content: `Developing AI project management tools involves various stages, from conceptualization to development and implementation. Here's how I can assist you through each phase:
        1. Conceptualization and Planning
        Idea Generation: Suggest innovative features based on current AI and project management trends.
        Requirements Gathering: Help you formulate functional and non-functional requirements for your tool.
        Scope Definition: Assist in defining the scope of your AI project management tool, including the identification of potential limitations and challenges.
        2. Design
        Architecture Design: Provide insights on designing the architecture of your tool, including choosing between a monolithic and microservices architecture.
        UI/UX Design: Offer advice on user interface and user experience best practices to make your tool intuitive and user-friendly.`
    }
];

export const TMP_TASKS: TaskType[] = [
    {
        title: 'UI/UX -> Human',
        description: '',
        status: CONSTANTS.TASK_CONFIRMED,
        assignee: '/tmp/avatars/assignee.png'
    },
    {
        title: 'Frontend -> AI',
        description: '',
        status: CONSTANTS.TASK_IN_PROGRESS,
        assignee: '/images/avatars/bot.png'
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