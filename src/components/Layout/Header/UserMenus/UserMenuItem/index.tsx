import React from "react";

type MenuItemType = {
    title: string;
    active: boolean;
    onClick: any;
}

const UserMenuItem = (props: MenuItemType) => {
    return (
        <div 
            className={`
                py-2 px-3 font-400 text-[12px] leading-[14px] border border-[1px] border-transparent text-base-300 cursor-pointer 
                hover:text-base-content hover:bg-[#292929] hover:border-base-200 
                ${props.active ? "text-base-content bg-[#292929] ": ""}
            `}
            onClick={props.onClick}
        >
            {props.title}
        </div>
    );
}

export default UserMenuItem;