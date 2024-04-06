import { MenuItemType } from "@/components/Layout/LeftSideBar/Menu/MenuItem";
import { InboxIcon, SquaresIcon, SunIcon, CogEIcon, VAIcon, ClockIcon, SparklesIcon, TwoCircleIcon, CircleIcon, ProgressIcon, ReviewIcon, DoneIcon, ChatIcon, CalendarIcon, QueueListIcon, FlowIcon } from "@/components/Icons";
import { BadgeType } from "@/components/Common/Badges/Badge";
import { MangoIcon } from "@/components/Icons/MangoIcon";
import { ColumnType, StatusIcons, TaskType } from "./types/type";
import { SubMenuType } from "@/components/Layout/LeftSideBar/TaskMenu/SubMenuTaskItem";
import { ReviewerCardType } from "@/components/Common/Cards/ReviewerCard";
import { AgentCardType } from "@/components/Common/Cards/AgentCard";
import { PromptCardType } from "@/components/Common/Cards/PromptCard";
import { CONSTANTS } from "@/config/constants";

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

export const PROFILE: any[] = [
  {
    avatar: "/tmp/avatars/profileImage.png",
    state: CONSTANTS.USER_ACTIVE,
    name: "Darrell Steward",
    title: "AI Specialist",
    hourly: 120,
    totalJobs: 1204,
    rating: 4.5,
    description: <div>With a master's degree from Brown University and many years of experience in technology, I specialize in making complex scripts and web/mobile apps. Whether you're an individual or a business, I strive to understand your needs and deliver the right solutions.  
    <br/><br/>My expertise includes but is not limited to:  Generative AI: GPT, Gemini/Bard, Llama, Dalle, Mistral, Claude, Stable Diffusion Front-End: HTML, CSS, JavaScript, React, Bootstrap Back-End: Node.js, Express, Laravel, Django, Python, Java, PHP Cloud Computing: AWS, Google Cloud, Azure, Heroku Database Management: MySQL, MongoDB, PostgreSQL Mobile App: 
    <br/><br/>React Native and Flutter  I'm committed to crafting customized solutions, from user-friendly websites to powerful apps and innovative AI applications. Your satisfaction is my priority, and I aim to exceed your expectations.  Interested? Let's connect and bring your vision to life.`</div>,
    histories: [
      {
        title: "Image design for a generative AI mobile application.",
        rating: 4.5,
        done_at: "5 Minutes ago",
        feedback: "Gunjan has deep AI knowledge and excellent writing skills. He is patient and receptive to feedback!"
      },
      {
        title: "Experienced AI Developer with Azure AI Expertise for HR PaaS - Conversational AI CV Maker Bot",
        rating: 4.5,
        done_at: "Feb 8, 2024",
        feedback: "He is knowledgeable and collaborative. It was a pleasure working with him. I highly recommend his freelance services to other clients."
      },
      {
        title: "Generative AI Expert familiar with LLM libraries",
        rating: 4.5,
        done_at: "Jul 14, 2023",
        feedback: "He was absolutely amazing to work with always on time and worked to help figure out the thing I needed completed and made sure I was happy with it. Absolutely"
      },
      {
        title: "Generative AI Expert familiar with LLM libraries",
        rating: 4.5,
        done_at: "Jul 14, 2023",
        feedback: "Expert freelancer with excellent tutorial skills. Very resourceful and goal-driven. I'm very satisfied with the hire!"
      },
      {
        title: "AI Data Engineer Needed for Writing on AI Infrastructure and Related Educational Topics",
        rating: 4.5,
        done_at: "Jul 14, 2023",
        feedback: "Gunjan has proved to be an exceptional tutor for learning about Hugging Face and AI model deployments. His vast knowledge and expertise in the field were evident from our very"
      },
    ]
  }
];

