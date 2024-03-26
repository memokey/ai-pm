import React, { ReactNode } from "react";

export type BadgeType = {
    icon?: ReactNode;
    title?: string;
    data: string | number;
    styles?: string;
};

const Badge = (props: BadgeType) => {
    return (
        <div className={`flex gap-1 items-center text-base-300 border border-base-200 text-[14px] font-500 px-[9px] py-[6px] rounded-[4px] ${props.styles}`}>
            {!!props.icon && (<div>{props.icon}</div>)}
            {!!props.title && (<div>{props.title} :</div>)}
            <div className="font-500 text-base-300">{props.data}</div>
        </div>
    );
}

export default Badge;