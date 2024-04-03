import React, { ReactNode } from "react";

type PrimaryBorderButtonType = {
    caption: string;
    icon?: ReactNode;
    type: boolean; //icon's position
    disabled?: boolean;
    styles?: string;
    onClick?: any
};

const PrimaryBorderButton = (props:PrimaryBorderButtonType) => {
    return (
        <button
            className={`bg-transparent px-4 py-2 text-[12px] border border-primary text-primary leading font-500 rounded-[4px] flex gap-2 items-center hover:bg-[#363636] shadow-b shadow-[#141414] shadow-sm ${props.styles ? props.styles: ''}`}
            onClick={props.onClick}
        >
            {props.type == true && props.icon}
            <span>{props.caption}</span>
            {!props.type == true && props.icon}
        </button>
    );
}

export default PrimaryBorderButton;