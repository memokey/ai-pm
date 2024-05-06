"use client";

import React from "react";
import { CogSIcon, PlusIcon, QuestionMarkCircleIcon } from "@/components/Icons";
import MenuItem from "../LeftSideBar/Menu/MenuItem";
import ProfileCard from "../LeftSideBar/ProfileCard";
import SubMenuTaskItem from "../LeftSideBar/TaskMenu/SubMenuTaskItem";
import { TASKER_SUB_MENUS } from "@/data/global";
import { useAppSelector } from "@/redux/hooks";
import LinkMenu from "@/components/Common/LinkMenu";

const TaskerLeftSidebar = () => {
    const { profile } = useAppSelector((state) => state.auth);

    return (
        <div className="bg-[#202020] border-[#090909] w-[240px] h-[100vh] z-20 py-[30px] px-[20px] border-r border-r-[1px]">
            <div className="h-[calc(100vh-132px)]">
                <ProfileCard />
                <div className="grid">
                    {TASKER_SUB_MENUS.map((submenu, index) => (
                        <SubMenuTaskItem
                            key={index}
                            {...submenu}
                            link={submenu.link}
                            active={submenu.title == "Tasks"}
                            styles={"!py-[8px]"}
                        />
                    ))}
                </div>
            </div>
            <div className="grid gap-1">
                <LinkMenu
                    icon={<CogSIcon />}
                    title="Profile"
                    link={`/${!!profile.id ? profile.id : ""}/profile`}
                    state={false}
                    line={false}
                />
                <LinkMenu
                    icon={<QuestionMarkCircleIcon />}
                    title="Resources"
                    link={"noLink"}
                    state={false}
                    line={false}
                />
            </div>
        </div>
    );
};

export default TaskerLeftSidebar;
