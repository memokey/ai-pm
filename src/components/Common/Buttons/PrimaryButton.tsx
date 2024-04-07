import React, { ReactNode } from "react";

type PrimaryButtonType = {
    caption: string;
    icon?: ReactNode;
    type: boolean; //icon's position
    disabled?: boolean;
    styles?: string;
    onClick?: any
};

const PrimaryButton = (props:PrimaryButtonType) => {
    return (
        <button
            className={`bg-primary text-center py-[6px] px-[8px] text-[12px] text-base-content font-500 rounded-[4px] flex gap-2 items-center hover:bg-[#3268E9] shadow-b shadow-[#141414] shadow-sm ${props.styles ? props.styles: ''}`}
            onClick={props.onClick}
        >
            {props.type == true && props.icon}
            <span className="w-full text-center">{props.caption}</span>
            {!props.type == true && props.icon}
        </button>
    );
}

export default PrimaryButton;