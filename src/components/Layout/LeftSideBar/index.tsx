'use client'

import React from "react";
import ProfileCard from "./ProfileCard";
import Menu from "./Menu";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import { CogSIcon, PlusIcon, QuestionMarkCircleIcon } from "@/components/Icons";
import { MENU_LIST, MENU_LIST_SPACE } from "@/data/global";
import MenuItem from "./Menu/MenuItem";
import { useRouter } from "next/navigation";

const LeftSidebar = () => {
    const router = useRouter();
    return (
        <div className="bg-[#202020] border-[#090909] w-[240px] h-[100vh] z-20 py-[30px] px-[20px] border-r border-r-[1px]">
            <div className="h-[calc(100vh-124px)]">
                <ProfileCard />
                <div className="grid gap-4">
                    <BaseButton 
                        type={true}
                        caption="Create New Task"
                        icon={<PlusIcon />}
                        styles="w-full"
                        onClick={() => router.push('/chat')}
                    />
                    <Menu menus={MENU_LIST} />
                    <Menu menus={MENU_LIST_SPACE} title="Space" />
                </div>
            </div>
            <div className="grid gap-1">
                <MenuItem 
                    icon={<CogSIcon />}
                    title="Settings"
                    link={'noLink'}
                    state={false}
                    line={false}
                />
                <MenuItem 
                    icon={<QuestionMarkCircleIcon />}
                    title="Resources"
                    link={'noLink'}
                    state={false}
                    line={false}
                />
            </div>
        </div>
    );
}

export default LeftSidebar;