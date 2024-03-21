import { MenuItemType } from "@/components/Layout/LeftSideBar/Menu/MenuItem";
import { InboxIcon, SquaresIcon, SunIcon, CogEIcon, VAIcon } from "@/components/Icons";

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