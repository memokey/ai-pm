import { MenuItemType } from "@/components/Layout/LeftSideBar/Menu/MenuItem";
import { InboxIcon, SquaresIcon, SunIcon, CogEIcon, VAIcon, ClockIcon, SparklesIcon, TwoCircleIcon } from "@/components/Icons";
import { BadgeType } from "@/components/Common/Badges/Badge";
import { MangoIcon } from "@/components/Icons/MangoIcon";

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
        link: "virtualassistance",
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