'use client'

import { DownArrowIcon, RightArrowIcon, RightIcon, VAIcon } from "@/components/Icons";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import SubMenuTaskItem from "./SubMenuTaskItem";
import { TASK_SUB_MENUS } from "@/data/global";
import { usePathname } from "next/navigation";
import { MenuItemType } from "../Menu/MenuItem";
import { setTaskExpand } from "@/redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const MenuItem = (props: MenuItemType) => {
    const dispatch = useAppDispatch();
    const { taskId } = useAppSelector(state => state.task);

    const [type, setType] = useState('chat');
    const pathname = usePathname()

    useEffect(() => {
        if(pathname) {
            const paths = pathname.split('/');
            if(paths.length > 0) {
                setType(paths[paths.length - 1]);
            }
        }
    }, [pathname])

    const subTasks = useMemo(() => (
        TASK_SUB_MENUS.map((submenu, index) => (
            <SubMenuTaskItem
                key={index}
                {...submenu}
                link={`/taskboard/${props._id}/${submenu.link}`}
                active={submenu.title.toLowerCase() == type && taskId == props._id && !!props.expand}
            />
        ))
    ), [props.expand, type]);

    const setExpand = () => {
        dispatch(setTaskExpand({
            _id: props._id,
            expand: !props.expand
        }))
    }

    return (
        <div className="gap-2">
            <div 
                className={`h-[28px] flex gap-[8px] rounded-[4px] items-center text-[14px] w-full 
                    py-1 px-[5px] cursor-pointer hover:bg-[#323232] 
                    ${props.expand ? '!bg-[#323232]': 'bg-transparent'}
                `}
                onClick={setExpand}
            >
                {
                    props.expand ? (
                        <DownArrowIcon />
                    ) : (
                        <RightIcon />
                    )
                }
                {props.icon ? props.icon : <VAIcon />}
                <span>
                    {props.title}
                </span>
            </div>
            {props.expand && (
                <div className="ml-[30px] py-1"> 
                {subTasks}
                </div>
            )}
        </div>
    );
}

export default MenuItem;