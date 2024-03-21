import React from "react";
import MenuItem, { MenuItemType } from "./MenuItem";

export type MenuType = {
    title?: string;
    menus: MenuItemType[];
};

const Menu = (props: MenuType) => {
    return (
        <div className="grid gap-3">
            <div className="text-[10px] text-[#838383] font-600 spacing-[1px]">{props.title}</div>
            {props.menus.map((menuItem, index) => (
                <div key={index}>
                    <MenuItem 
                        {...menuItem}
                    />
                    {menuItem.line && (
                        <div className="w-full h-[1px] border-linear"></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Menu;