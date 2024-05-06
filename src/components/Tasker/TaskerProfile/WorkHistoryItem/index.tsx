import { Badge } from "@/components/Common/Badges";
import { RatingIcon } from "@/components/Icons";
import React from "react";

const WorkHistory = (props: any) => {
    return (
        <div className="py-5 px-4 border-base-200 border rounded-[8px]">
            <div
                className="w-fit text-[11px] font-400 border border-base-200 leading-[20px] px-2 rounded-[4px] mb-2"
                style={{ color: true ? "#069F5D" : "#F66E4C" }}
            >
                {true ? "Completed" : "Rejected"}
            </div>
            <div className="grid gap-2">
                <div className="w-full">{props.title}</div>
                <div className="grid gap-4">
                    <div className="flex">
                        <div className="border-r border-base-200 flex gap-[2px] items-center pr-2">
                            <RatingIcon /> <span>{props.rate}</span>
                        </div>
                        <div className="text-base-300 pl-2">
                            {props.completedDate}
                        </div>
                    </div>
                    <div className="text-[12px] font-400 text-base-300">
                        {props.content}
                    </div>
                    {/* <div className="flex gap-2">
                        {props.agents.map((agent: string, index: number) => (
                            <Badge 
                                key={index}
                                data={agent}
                                styles="!rounded-full !py-1 !px-2"
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default WorkHistory;
