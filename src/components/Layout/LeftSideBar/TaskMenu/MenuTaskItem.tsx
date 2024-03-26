'use client'

import { DownArrowIcon } from "@/components/Icons";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import SubMenuTaskItem from "./SubMenuTaskItem";
import { TASK_SUB_MENUS } from "@/data/global";
import { usePathname } from "next/navigation";

export type MenuItemType = {
    icon: ReactNode;
    title: string;
    link: string;
    state: boolean;
    line: boolean;
}

const MenuItem = (props: MenuItemType) => {
    const [expand, setExpand] = useState(false);
    const [active, setActive] = useState(false);
    const pathname = usePathname()
    
    useEffect(() => {
        if(pathname) {
            setActive(pathname.split('/')[1] == 'taskboard');
        }
    }, [pathname])

    const subTasks = useMemo(() => (
        TASK_SUB_MENUS.map((submenu, index) => (
            <SubMenuTaskItem 
                key={index}
                {...submenu}
                link={props.link}
                active={submenu.title == "Tasks"}
            />
        ))
    ), [pathname]);

    return (
        <div className="gap-2">
            <div 
                className={`h-[28px] flex gap-[8px] rounded-[4px] items-center text-[14px] w-full 
                py-1 px-[5px] cursor-pointer hover:bg-[#323232] 
                ${!!active ? "!bg-[#323232]": "bg-transparent"} 
                ${expand ? '!bg-[#323232]': 'bg-transparent'}
                `}
                onClick={() => setExpand(!expand)}
            >
                <DownArrowIcon />
                {props.icon}
                <span>
                    {props.title}
                </span>
            </div>
            {(expand || active) && (
                <div className="ml-[30px]"> 
                {subTasks}
                </div>
            )}
        </div>
    );
}

export default MenuItem;