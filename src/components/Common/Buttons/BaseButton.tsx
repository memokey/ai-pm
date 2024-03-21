import React, { ReactNode } from "react";

type BaseButtonType = {
    caption: string;
    icon: ReactNode;
    type: boolean; //icon's position
    disabled?: boolean;
    styles?: string;
};

const BaseButton = (props:BaseButtonType) => {
    return (
        <button
            className={`bg-base-200 py-[6px] px-[8px] text-[12px] text-base-content font-[500] rounded-[4px] flex gap-2 items-center hover:bg-[#363636] ${props.styles ? props.styles: ''}`}
        >
            {props.type == true && props.icon}
            <span>{props.caption}</span>
            {!props.type == true && props.icon}
        </button>
    );
}

export default BaseButton;