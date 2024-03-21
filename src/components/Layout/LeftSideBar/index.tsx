import React from "react";
import ProfileCard from "./ProfileCard";
import Menu from "./Menu";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import { PlusIcon } from "@/components/Icons";
import { MENU_LIST, MENU_LIST_SPACE } from "@/data/global";

const LeftSidebar = () => {
    return (
        <div className="bg-[#202020] border-[#090909] w-[240px] h-[100vh] z-20 py-[30px] px-[20px] border-r border-r-[1px]">
            <ProfileCard />
            <div className="grid gap-4">
                <BaseButton 
                    type={true}
                    caption="Create New Task"
                    icon={<PlusIcon />}
                    styles="w-full"
                />
                <Menu menus={MENU_LIST} />
                <Menu menus={MENU_LIST_SPACE} title="Space" />
            </div>
        </div>
    );
}

export default LeftSidebar;