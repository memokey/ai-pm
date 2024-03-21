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
            className={`h-[28px] flex bg-transparent gap-[5px] items-center text-[14px] w-full py-1 px-[5px] cursor-pointer hover:bg-[#323232] ${props.state ? "bg-[#323232]": ""}`}
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