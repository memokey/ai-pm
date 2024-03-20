import React from "react";
import ProfileCard from "./ProfileCard";
import Menu from "./Menu";

const LeftSidebar = () => {
    return (
        <div className="left-sidebar w-[240px] h-[100vh] z-20 py-[30px] px-[20px] border-r border-r-[1px] border-base-200">
            <ProfileCard />
            <Menu />
        </div>
    );
}

export default LeftSidebar;