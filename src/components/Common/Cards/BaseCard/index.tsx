import React, { ReactNode } from "react";
import BaseButton from "../../Buttons/BaseButton";
import { RightArrowIcon } from "@/components/Icons";

export type BaseCardType = {
    title: string;
    description: ReactNode;
    button: ReactNode;
}

const BaseCard = (props: BaseCardType) => {
    return (
        <div className="grid gap-4 py-3 px-4 bg-[#212121] rounded-2">
            <div className="grid gap-2">
                <h2 className="text-[16px] text-base-content font-600 leading-[25px]">
                    {props.title}
                </h2>
                <div className="text-base-300 text-[13px] font-600 leading-[20px]">
                    {props.description}
                </div>
            </div>
            <div>
                {props.button}
            </div>
        </div>
    );
}

export default BaseCard;