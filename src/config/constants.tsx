import {
    CircleIcon,
    DoneIcon,
    ProgressIcon,
    ReviewIcon,
} from "@/components/Icons";

export const CONSTANTS = {
    // Message type
    USER_MESSAGE_TYPE: true,
    BOT_MESSAGE_TYPE: false,

    // Message action
    DETAIL_ACTION: 0,
    METRIX_ACTION: 1,
    TASKS_ACTION: 2,

    // User State
    USER_ACTIVE: 0,
    USER_IDLE: 1,
    USER_INACTIVE: 2,

    //Task Progress
    TASK_CONFIRMED: "Done",
    TASK_IN_REVIEW: "In Review",
    TASK_IN_PROGRESS: "In Progress",
    TASK_WAITING: "To do",

    PRIORITY_COLORS: ["#DCC32A", "#04CD76", "#E54C26"],
    PRIORITY_TEXTS: ["Easy", "Medium", "High"],

    USER_STATES: ["#069F5D", "#FE3300", "#929292"],
};
