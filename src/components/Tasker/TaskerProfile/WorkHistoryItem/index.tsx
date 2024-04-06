import { RatingIcon } from "@/components/Icons";
import React from "react";

const WorkHistory = (props: any) => {
    return (
        <div className="py-4 border-base-200 border-b">
            <div className="grid gap-2">
                <div className="w-full">{props.title}</div>
                <div className="flex">
                    <div className="border-r border-base-200 flex gap-[2px] items-center pr-2">
                        <RatingIcon /> <span>{props.rating}</span>
                    </div>
                    <div className="text-base-300 pl-2">{props.done_at}</div>
                </div>
                <div className="text-[12px] font-400 text-base-300">"{props.feedback}"</div>
            </div>
        </div>
    );
}

export default WorkHistory;