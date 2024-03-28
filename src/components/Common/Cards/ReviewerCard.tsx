import React from "react";
import { Avatar } from "../Avatars";
import { Badge } from "../Badges";
import { CircleChartIcon, DollarIcon, EditIcon, PlusIcon } from "@/components/Icons";

export type ReviewerCardType = {
    avatar: string;
    name: string;
    bio: string;
    hourly: number;
    percent: number;
}

const ReviewerCard = (props: ReviewerCardType) => {
    return (
        <div className="p-3 bg-[#2A2A2A] rounded-[8px] flex gap-2">
            <div className="">
                <Avatar img={props.avatar} size={20} />
            </div>
            <div className="grid gap-3 w-full">
                <div className="flex gap-2 justify-between">
                    <div className="grid gap-2 w-full">
                        <div className="text-[14px] font-600 text-base-content">{props.name}</div>
                        <div className="text-[12px] font-400 text-base-300">{props.bio}</div>
                    </div>
                    <div className="flex gap-2 items-start">
                        <div className="p-[6px] rounded-full bg-base-200 cursor-pointer">
                            <EditIcon />
                        </div>
                        <div className="p-[6px] rounded-full bg-base-200 border-base-300 border cursor-pointer">
                            <PlusIcon />
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Badge 
                        icon={<CircleChartIcon />}
                        data={props.percent * 100 + "%"} 
                        styles="!p-1 !text-base-content" 
                    />
                    <Badge 
                        icon={<DollarIcon />}
                        data={props.percent * 100 + "%"}  
                        styles="!p-1 !text-base-content"
                    />
                </div>
            </div>
        </div>
    );
}

export default ReviewerCard;