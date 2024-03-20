import { MenuItemType } from "@/components/Layout/LeftSideBar/Menu/MenuItem";
import { InboxIcon, SquaresIcon, SunIcon, CogEIcon } from "@/components/Icons";

export const MENULIST: MenuItemType[] = [
    {
        icon: <InboxIcon />,
        state: true,
        title: "Chat",
        link: "chat",
        line: true
    },
    {
        icon: <SquaresIcon />,
        state: false,
        title: "Dashboard",
        link: "dashboard",
        line: false
    },
    {
        icon: <SunIcon />,
        state: false,
        title: "Tasks",
        link: "tasks",
        line: true
    },
    {
        icon: <CogEIcon />,
        state: false,
        title: "Settings",
        link: "settings",
        line: false
    }
];