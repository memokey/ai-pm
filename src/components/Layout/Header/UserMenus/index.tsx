import { MENUS } from "@/data/global";
import React from "react";
import UserMenuItem from "./UserMenuItem";

const UserMenus = () => {
    return (
        <div className="flex gap-4 items-center">
            {MENUS.map((menu, index) => (
                <UserMenuItem
                    key={index}
                    {...menu} 
                />
            ))}
        </div>
    );
}

export default UserMenus;