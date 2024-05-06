import { Avatar } from "@/components/Common/Avatars";
import {
    PrimaryBorderButton,
    PrimaryButton,
} from "@/components/Common/Buttons";
import { RatingIcon } from "@/components/Icons";
import React from "react";
import WorkHistory from "./WorkHistoryItem";
import { PROFILE } from "@/data/global";

const TaskerProfile = (props: any) => {
    return (
        <div className="p-[20px] w-full">
            <div className="flex justify-between mb-[24px] p-[20px] bg-[#1C1C1C] border border-[#343434] shadow-md shadow-[#141414] rounded-[8px]">
                <div className="flex gap-4 items-center">
                    <Avatar
                        img={props.avatar}
                        size={70}
                        styles="!rounded-[8px]"
                    />
                    <div className="grid gap2">
                        <h1 className="text-[24px] font-500 text-base-content">
                            {props.name}
                        </h1>
                        <p className="text-[14px] font-400 text-neutral">
                            {PROFILE[0].title}
                        </p>
                    </div>
                </div>
                <div className="flex py-2">
                    <div className="px-[20px] border-r border-base-200">
                        <div className="text-base-content text-[18px] font-600 spacing-[0.18px] grid gap-2">
                            {"$" + props.totalEarnings || 0}
                        </div>
                        <div className="text-[14px] leading-[20px] font-400 text-neutral">
                            Total Earnings
                        </div>
                    </div>
                    <div className="px-[20px] border-r border-base-200">
                        <div className="text-base-content text-[18px] font-600 spacing-[0.18px] grid gap-2">
                            {"$" + props.hourlyRate + "/hr"}
                        </div>
                        <div className="text-[14px] leading-[20px] font-400 text-neutral">
                            Hourly Rate
                        </div>
                    </div>
                    <div className="px-[20px] border-r border-base-200">
                        <div className="text-base-content text-[18px] font-600 spacing-[0.18px] grid gap-2">
                            {props.totalJobs}
                        </div>
                        <div className="text-[14px] leading-[20px] font-400 text-neutral">
                            Total Jobs
                        </div>
                    </div>
                    {/* <div className="px-[20px] border-r border-base-200 grid gap-2"> */}
                    {/* <div className="flex gap-2 items-end">
                            <Avatar
                                img="/tmp/avatars/superteam.png"
                                size={20}
                            />
                            <div className="text-[14px] leading-[20px] font-700">
                                Superteam
                            </div>
                        </div>
                        <div className="flex gap-2 text-[14px] leading-[20px] font-400 text-base-content items-start">
                            <Avatar img="/tmp/avatars/76.png" size={20} />
                            <div className="text-[14px] font-700">76 Devs</div>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
            <div className="w-full grid grid-cols-10 gap-4">
                <div className="col-span-7 h-[20px]">
                    <div className="text-[16px] font-500 leading-[20px] text-neutral mb-4">
                        Work History
                    </div>
                    <div className="h-[calc(100vh-276px)] overflow-y-auto">
                        <div className="grid gap-4 pr-1">
                            {!!props.feedbacks &&
                                props.feedbacks.map((feedback: any) => (
                                    <WorkHistory
                                        key={feedback.task_id}
                                        {...feedback}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-3 h-[20px]">
                    <div className="grid gap-4 mb-5">
                        <div className="text-[16px] font-500 leading-[20px] text-neutral">
                            Skills
                        </div>
                        <div className="w-full">
                            <img
                                src="/tmp/utils/skills.png"
                                className="w-full"
                                alt="skills"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="text-[16px] font-500 leading-[20px] text-neutral">
                            Task Completion Ratio
                        </div>
                        <div className="grid grid-cols-2 w-full py-5 px-4 rounded-[8px] bg-[#1C1C1C] border border-[#2A2A2A]">
                            <div className="px-[20px] border-r border-base-200">
                                <div className="text-base-content text-[18px] font-600 spacing-[0.18px] grid gap-2">
                                    {50 + "%"}
                                </div>
                                <div className="text-[14px] leading-[20px] font-400 text-neutral">
                                    Coding Assignment
                                </div>
                            </div>
                            <div className="px-[20px]">
                                <div className="text-base-content text-[18px] font-600 spacing-[0.18px] grid gap-2">
                                    {89 + "%"}
                                </div>
                                <div className="text-[14px] leading-[20px] font-400 text-neutral">
                                    AI Review
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskerProfile;
