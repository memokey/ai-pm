import React, { ReactNode } from "react";
import BaseButton from "../../Buttons/BaseButton";
import { EditIcon, RightArrowIcon } from "@/components/Icons";
import { Avatar } from "../../Avatars";

export type AgentCardType = {
    title: string;
    img: string;
    edit?: any;
}

const AgentCard = (props: AgentCardType) => {
    return (
        <div className="grid gap-4 p-3 w-full bg-[#2A2A2A] border border-[#343434] shadow-[#141414] shadow-sm rounded-[8px]">
            <div className="flex gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <div className="">
                        <Avatar img={props.img} size={20} />
                    </div>
                    <div className="text-[16px] text-base-content font-600 leading-[25px]">
                        {props.title}
                    </div>
                </div>
                <div className="p-[6px] rounded-full bg-base-200 cursor-pointer">
                    <EditIcon />
                </div>
            </div>
        </div>
    );
}

export default AgentCard;