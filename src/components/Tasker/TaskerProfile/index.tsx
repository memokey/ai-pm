import { Avatar } from "@/components/Common/Avatars";
import { PrimaryBorderButton, PrimaryButton } from "@/components/Common/Buttons";
import { RatingIcon } from "@/components/Icons";
import React from "react";
import WorkHistory from "./WorkHistoryItem";

const TaskerProfile = (props: any) => {
    return (
        <div className="w-full py-[48px] px-[80px] grid grid-cols-10 gap-6">
            <div className="col-span-4">
                <div className="mb-6">
                    <div className="rounded-[8px] border border-[#343434] bg-[#2A2A2A] shadow-sm shadow-[#141414] p-4">
                        <div className="flex gap-4 items-center mb-4">
                            <Avatar img={props.avatar} size={80} state={props.state} />
                            <div className="grid gap2">
                                <h1 className="text-[24px] font-500 text-base-content">{props.name}</h1>
                                <p className="text-[14px] font-400 text-base-300">{props.title}</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-2 mb-4">
                            <PrimaryButton 
                                caption="Assign Task"
                                icon={<></>}
                                type={false}
                                styles="w-full"
                            />
                            <PrimaryBorderButton 
                                caption="Reject"
                                icon={<></>}
                                type={false}
                                styles="w-full hover:!bg-primary hover:!text-base-content"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="border-r border-base-200 grid gap-2">
                                <div className="text-[16px] font-500 text-base-content">
                                    {props.hourly}
                                </div>
                                <div className="text-[12px] font-400 text-base-300">Total Earnings</div>
                            </div>
                            <div className="border-r border-base-200 grid gap-2">
                                <div className="text-[16px] font-500 text-base-content">
                                    {props.totalJobs}
                                </div>
                                <div className="text-[12px] font-400 text-base-300">Total Jobs</div>
                            </div>
                            <div className="grid gap-2">
                                <div className="text-[16px] font-500 text-base-content flex gap-1 items-center">
                                    <RatingIcon />
                                    <span>
                                        {props.rating}
                                    </span>
                                </div>
                                <div className="text-[12px] font-400 text-base-300">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-[14px] font-600 text-[#585757] mb-4">Description</div>
                    <div className="text-[14px] font-400 leading-[20px] text-base-300">
                        {props.description}
                    </div>
                </div>
            </div>
            <div className="col-span-6 rounded-t-[8px] border border-base-200 p-[20px]">
                <div className="text-[16px] font-500 text-[#585757] leading-[20px] mb-4">Work History</div>
                <div className="grid gap-6 border-b border-base-200">
                    {props.histories.map((history: any, index: Number) => (
                        <WorkHistory 
                            key={index}
                            {...history}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskerProfile;