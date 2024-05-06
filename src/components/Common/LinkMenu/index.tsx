"use client";

import { VAIcon } from "@/components/Icons";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";

type MenuItemType = {
    _id?: String;
    icon?: ReactNode;
    title: String;
    link: string;
    state: Boolean;
    line: Boolean;
    expand?: Boolean;
};

const LinkMenu = (props: MenuItemType) => {
    const router = useRouter();
    const expand = () => {
        if (props.link != "noLink") {
            router.push(props.link);
        }
    };

    return (
        <div
            className={`h-[28px] flex bg-transparent gap-[5px] rounded-[4px] items-center text-[14px] w-full py-1 px-[5px] cursor-pointer hover:bg-[#323232] ${
                props.state ? "bg-[#323232]" : ""
            }`}
            onClick={expand}
        >
            {props.icon ? props.icon : <VAIcon />}
            <span>{props.title}</span>
        </div>
    );
};

export default LinkMenu;
