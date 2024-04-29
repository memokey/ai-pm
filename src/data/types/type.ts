import { ReactNode } from "react";

export type Id = string | number;

export type ColumnType = {
    id: Id;
    title: string;
    icon: ReactNode;
};

export type IconType = {
    size?: number;
}

export type TaskType = {
    id: string;
    columnId: Id;
    parentId: Id | null;
    title: string;
    properties: PropertyType;
    description: string;
    taskProgress: number;
    subTasks: TaskType[];
    created: string;
    lastUpdated: string;
    
};

export type PropertyType = {
    status: string;
    assignees: AssgineeType[];
    priority: number;
    dueDate: string;
    agents: AgentType[];
    humans: HumanReviewerType[];
    messages: number;
    shares: number;
}

export type AgentType = {
    name: string;
    avatar: string;
}

export type HumanReviewerType = {
    name: string;
    avatar: string;
}

export type AssgineeType = {
    name: string;
    img?: string;
};

export interface StatusIcons {
    [key: string]: JSX.Element; // Allow indexing with any string
}

export type loginProps = {
    publicKey: string;
    walletType: string;
    provider: any
    next?: any
}

export type SendMessageTpye = {
    prompt: String;
    taskId: String;
    history: any[];
    next?: any;
}

export type DaoType = {
    _id: string;
    name: string;
    img: string;
    selected?: boolean;
}
export type SkillType = {
    _id: string;
    name: string;
    selected?: boolean;
}