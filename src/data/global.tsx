import { MenuItemType } from "@/components/Layout/LeftSideBar/Menu/MenuItem";
import { InboxIcon, SquaresIcon, SunIcon, CogEIcon, VAIcon, ClockIcon, SparklesIcon, TwoCircleIcon, CircleIcon, ProgressIcon, ReviewIcon, DoneIcon, ChatIcon, CalendarIcon, QueueListIcon, FlowIcon } from "@/components/Icons";
import { BadgeType } from "@/components/Common/Badges/Badge";
import { MangoIcon } from "@/components/Icons/MangoIcon";
import { ColumnType, StatusIcons, TaskType } from "./types/type";
import { SubMenuType } from "@/components/Layout/LeftSideBar/TaskMenu/SubMenuTaskItem";
import { ReviewerCardType } from "@/components/Common/Cards/ReviewerCard";
import { AgentCardType } from "@/components/Common/Cards/AgentCard";
import { PromptCardType } from "@/components/Common/Cards/PromptCard";

export const MENU_LIST: MenuItemType[] = [
    {
        icon: <InboxIcon />,
        state: false,
        title: "Inbox",
        link: "inbox",
        line: false
    }
];

export const MENU_LIST_SPACE: MenuItemType[] = [
    {
        icon: <VAIcon />,
        state: false,
        title: "Virtual Assistance",
        link: "taskboard",
        line: false
    }
];

export const METRIX: BadgeType[] = [
    {
        icon: <ClockIcon />,
        title: 'Time',
        data: '5h'
    },
    {
        icon: <SparklesIcon />,
        title: 'AI Agent',
        data: '4'
    },
    {
        icon: <TwoCircleIcon />,
        title: 'Humans',
        data: '3'
    },
    {
        icon: <MangoIcon />,
        title: 'Expense',
        data: '55$'
    },
];

export const STATUS_ICONS: StatusIcons = {
  'To do': <CircleIcon />,
  'In Progress': <ProgressIcon />,
  'In Review': <ReviewIcon />,
  'Done': <DoneIcon />
}

export const DEFAULT_COLS: ColumnType[] = [
    {
        id: "todo",
        title: "To do",
        icon: <CircleIcon />
      },
      {
        id: "doing",
        title: "Work in progress",
        icon: <ProgressIcon />
      },
      {
        id: "review",
        title: "Review",
        icon: <ReviewIcon />
      },
      {
        id: "done",
        title: "Done",
        icon: <DoneIcon />
      },
]

export const TASK_SUB_MENUS: SubMenuType[] = [
  {
    icon: <ChatIcon />,
    title: 'Chat'
  },
  {
    icon: <CalendarIcon />,
    title: 'Dashboard'
  },
  {
    icon: <QueueListIcon />,
    title: 'Tasks'
  },
  {
    icon: <FlowIcon />,
    title: 'Flow'
  },
]

export const DEFAULT_TASKS: TaskType[] = [
    {
      id: "1",
      columnId: "todo",
      parentId: null,
      title: "List admin APIs for dashboard",
      properties: {
        status: 'To do',
        assignees: [
          {
            name: "John Doe",
            img: '/tmp/avatars/john.png'
          },
          {
            name: "Claude",
            img: '/images/utils/Ada.png'
          },
        ],
        priority: 1,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "2",
      columnId: "todo",
      parentId: null,
      title:
        "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
      properties: {
          status: 'To do',
          assignees: [{
              name: "John Doe",
              img: '/tmp/avatars/john.png'
          }],
          priority: 2,
          dueDate: 'Yesterday',
          agents: [{
              name: 'Claude',
              avatar: '/images/utils/Ada.png'
          }],
          humans: [{
              name: 'Claude',
              avatar: '/images/utils/Ada.png'
          }],
          messages: 12,
          shares: 1,          
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [
        {
          id: "3",
          columnId: "doing",
          parentId: "2",
          title: "Conduct security testing",
          properties: {
            status: 'In Progress',
            assignees: [{
                name: "John Doe",
                img: '/tmp/avatars/john.png'
            }],
            priority: 0,
            dueDate: 'Yesterday',
            agents: [{
                name: 'Claude',
                avatar: '/images/utils/Ada.png'
            }],
            humans: [{
                name: 'Claude',
                avatar: '/images/utils/Ada.png'
            }],
            messages: 12,
            shares: 1
          },
          description: 'Add a description for AI',
          taskProgress: 0.75,
          subTasks: [],
          created: 'Yesterday',
          lastUpdated: 'Just Now'
        },
        {
          id: "4",
          columnId: "todo",
          parentId: "2",
          title: "Analyze competitors",
          properties: {
            status: 'To do',
            assignees: [{
                name: "John Doe",
                img: '/tmp/avatars/john.png'
            }],
            priority: 2,
            dueDate: 'Yesterday',
            agents: [{
                name: 'Claude',
                avatar: '/images/utils/Ada.png'
            }],
            humans: [{
                name: 'Claude',
                avatar: '/images/utils/Ada.png'
            }],
            messages: 12,
            shares: 1
          },
          description: 'Add a description for AI',
          taskProgress: 0.75,
          subTasks: [],
          created: 'Yesterday',
          lastUpdated: 'Just Now'
        },
      ],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "3",
      columnId: "doing",
      parentId: "2",
      title: "Conduct security testing",
      properties: {
        status: 'In Progress',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 0,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "4",
      columnId: "todo",
      parentId: "2",
      title: "Analyze competitors",
      properties: {
        status: 'To do',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 2,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "5",
      columnId: "done",
      parentId: null,
      title: "Create UI kit documentation",
      properties: {
        status: 'Done',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 0,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "6",
      columnId: "review",
      parentId: null,
      title: "Dev meeting",
      properties: {
        status: 'In Review',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 2,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "7",
      columnId: "done",
      parentId: null,
      title: "Deliver dashboard prototype",
      properties: {
        status: 'Done',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 2,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "8",
      columnId: "review",
      parentId: null,
      title: "Optimize application performance",
      properties: {
        status: 'In Review',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 0,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "9",
      columnId: "review",
      parentId: null,
      title: "Implement data validation",
      properties: {
        status: 'In Review',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 2,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "10",
      columnId: "todo",
      parentId: null,
      title: "Design database schema",
      properties: {
        status: 'To do',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 0,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "11",
      columnId: "todo",
      parentId: null,
      title: "Integrate SSL web certificates into workflow",
      properties: {
        status: 'To do',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 2,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "12",
      columnId: "doing",
      parentId: null,
      title: "Implement error logging and monitoring",
      properties: {
        status: 'In Progress',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 2,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
    {
      id: "13",
      columnId: "doing",
      parentId: null,
      title: "Design and implement responsive UI",
      properties: {
        status: 'In Progress',
        assignees: [{
            name: "John Doe",
            img: '/tmp/avatars/john.png'
        }],
        priority: 2,
        dueDate: 'Yesterday',
        agents: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        humans: [{
            name: 'Claude',
            avatar: '/images/utils/Ada.png'
        }],
        messages: 12,
        shares: 1
      },
      description: 'Add a description for AI',
      taskProgress: 0.75,
      subTasks: [],
      created: 'Yesterday',
      lastUpdated: 'Just Now'
    },
];

export const REVIEWERS: ReviewerCardType[] = [
  {
    avatar: '/tmp/avatars/reviewer1.png',
    name: 'UC Berkely',
    bio: 'Group of qualified students',
    percent: 0.85,
    hourly: 40,
  },
  {
    avatar: '/tmp/avatars/reviewer2.png',
    name: 'New York State University',
    bio: 'Group of qualified students',
    percent: 0.80,
    hourly: 32,
  },
  {
    avatar: '/tmp/avatars/reviewer3.png',
    name: 'SF University',
    bio: 'Group of qualified students',
    percent: 0.82,
    hourly: 28,
  },
];

export const AGENTS: AgentCardType[] = [
  {
    title: "Chatgpt",
    img: '/images/utils/chatgpt.png'
  },
  {
    title: "Claude",
    img: '/images/utils/Ada.png'
  },
];

export const CARD_PROMPTS: PromptCardType[] = [
  {
    title: 'I want to create uber like SAAS product for AI',
  },
  {
    title: 'I want to create wallpaper ios application',
  },
  {
    title: 'I want to create CRM for sales professional',
  },
];