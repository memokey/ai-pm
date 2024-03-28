import React, { ReactNode } from "react";
import BaseButton from "../../Buttons/BaseButton";
import { RightArrowIcon } from "@/components/Icons";

export type PromptCardType = {
    title: string;
}

const PromptCard = (props: PromptCardType) => {
    return (
        <div className="grid gap-4 py-3 px-4 bg-[#2A2A2A] border border-[#343434] shadow-[#141414] shadow-sm rounded-[8px]">
            <div className="grid gap-2">
                <h2 className="text-[16px] text-base-300 font-600 leading-[25px]">
                    {props.title}
                </h2>
            </div>
            <div className="text-base-300 hover:text-base-content cursor-pointer">
                <RightArrowIcon size={24} />
            </div>
        </div>
    );
}

export default PromptCard;