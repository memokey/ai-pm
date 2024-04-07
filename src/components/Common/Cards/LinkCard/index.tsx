import { CheckIcon } from "@/components/Icons";
import React, { ReactNode, useState } from "react";

export type LinkCardType = {
    title: string;
    icon: ReactNode;
    selected: boolean;
}

const LinkCard = (props: LinkCardType) => {
    const [hover, setHover] = useState(false);
    return (
        <div 
            className="rounded-[4px] bg-[] border border-base-200 px-3 py-2 flex items-center gap-1 cursor-pointer" 
            style={{
                boxShadow: hover ? "0px 2px 1px 0px #111": "",
                background: props.selected || hover ? "linear-gradient(90deg, #191919 0%, #252525 48.5%, #191919 100%)": ""
            }}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {props.icon}
            <div className="text-[14px] font-500 text-base-content">
                {props.title}
            </div>
            <div className="w-[16px] h-[16px]">
                {!!props.selected && (
                    <CheckIcon />
                )}
            </div>
        </div>
    );
}

export default LinkCard;