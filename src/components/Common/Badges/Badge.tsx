import React from "react";

export type BadgeType = {
    title: string;
};

const Badge = (props: BadgeType) => {
    return (
        <div className="border border-base-200 text-[14px] font-[700] px-[9px] py-[6px] rounded-[4px]">
            {props.title}
        </div>
    );
}

export default Badge;