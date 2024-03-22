import React, { ReactNode } from "react";

export type BadgeType = {
    icon: ReactNode;
    title: string;
    data: string;
    styles?: string;
};

const Badge = (props: BadgeType) => {
    return (
        <div className={`flex gap-1 items-center text-base-300 border border-base-200 text-[14px] font-[700] px-[9px] py-[6px] rounded-[4px] ${props.styles}`}>
            <div>{props.icon}</div><div>{props.title}</div>: <div className="font-700 text-base-content">{props.data}</div>
        </div>
    );
}

export default Badge;