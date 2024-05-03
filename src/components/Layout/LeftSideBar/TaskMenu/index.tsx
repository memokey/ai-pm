import React, { useMemo } from "react";
import MenuItem, { MenuItemType } from "../Menu/MenuItem";
import MenuTaskItem from "./MenuTaskItem";

export type TaskMenuType = {
    title?: string;
    menus: MenuItemType[];
};

const TaskMenu = (props: TaskMenuType) => {
    const menuItems = useMemo(() => (
        props.menus.map((menuItem, index) => (
            <div key={index}>
                <MenuTaskItem 
                    {...menuItem}
                />
                {menuItem.line && (
                    <div className="w-full h-[1px] border-linear"></div>
                )}
            </div>
        ))
    ), [props.menus])
    return (
        <div className="grid gap-3">
            <div className="text-[10px] text-[#838383] font-600 spacing-[1px]">{props.title}</div>
            <div className="grid gap-3 h-[calc(100vh-258px)] overflow-auto">
                <div>
                    {menuItems}
                </div>
            </div>
        </div>
    );
}

export default TaskMenu;