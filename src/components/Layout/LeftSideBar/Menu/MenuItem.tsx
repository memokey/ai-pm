'use client'

import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export type MenuItemType = {
    icon: ReactNode;
    title: string;
    link: string;
    state: boolean;
    line: boolean;
}

const MenuItem = (props: MenuItemType) => {
    const router = useRouter();
    const linkToPage = () => {
        router.push('/' + props.title.toLowerCase())
    }

    return (
        <div 
            className={`h-[44px] flex gap-4 w-full p-3 cursor-pointer rounded-[4px] hover-menu-gradient ${props.state ? "menu-gradient border-l border-base-content border-l-[2px]": ""}`}
            onClick={linkToPage}
        >
            {props.icon}
            <span>
                {props.title}
            </span>
        </div>
    );
}

export default MenuItem;