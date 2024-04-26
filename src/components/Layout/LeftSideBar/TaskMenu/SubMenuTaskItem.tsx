import React, { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type SubMenuType = {
    icon: ReactNode;
    title: string;
    link?: string;
    active?: Boolean;
    styles?: string;
}
const SubMenuTaskItem = (props: SubMenuType) => {
    const router = useRouter();

    const linkToPage = () => {
        if(props.link === "noLink") {
            return;
        }
        router.push(props.link || "")
    }

    return (
        <div 
            className={`flex gap-1 items-center px-[6px] py-1 border-l cursor-pointer hover:text-base-content ${props.styles ? props.styles: ""}`}
            style={{borderColor: !!props.active ? '#F2F2F2': '#424242', color: props.active ? '#F2F2F2': '#BFBFBF'}}
            onClick={linkToPage}
        >
            {props.icon}
            <div className="text-[12px] font-400">{props.title}</div>
        </div>
    );
}

export default SubMenuTaskItem;