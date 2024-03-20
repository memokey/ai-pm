import React from "react";
import MenuItem from "./MenuItem";
import { MENULIST } from "@/data/global";

const Menu = () => {
    return (
        <div className="grid gap-3">
            {MENULIST.map((menuItem, index) => (
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