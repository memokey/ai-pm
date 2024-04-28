import { CONSTANTS } from "@/config/constants";
import { STATUS_ICONS } from "@/data/global";
import { TaskType } from "@/data/types/type";
import React, { useState } from "react";
import { Avatar } from "../Common/Avatars";
import { Badge } from "../Common/Badges";
import { PrimaryBorderButton } from "../Common/Buttons";
import { AttachIcon, AvatarIcon, CalendarIcon, CloseIcon, DollarIcon, DownArrowIcon, FileShareIcon, FlagIcon, PaperIcon, PlussmIcon, RoundDollarIcon, ShareIcon, SlashIcon, ThreeDotIcon } from "../Icons";
import { FlagBorderIcon } from "../Icons/FlagBorderIcon";
import { ChatInputSm } from "../Common/Inputs";

const DetailRequest = (props: any) => {
    const [selectedSubTask, setSelectedSubTask] = useState(-1);

    return (
        <div className="flex w-full">
            <div className="py-[24px] px-[60px] w-full">
                <div className="flex gap-4 justify-between">
                    <div className="text-[20px] font-500 leading-[30px]">{props.title}</div>
                    <div className="min-w-[120px]">
                        <PrimaryBorderButton
                            icon={<></>}
                            caption="Add to Board"
                            type={false}
                        />
                    </div>
                </div>
                <div className="py-4 grid gap-2 border-b border-base-200">
                    <h2 className="text-[12px] font-400 leading-[12px] text-base-300">Properties</h2>
                    <div className="grid grid-cols-3 items-center">
                        <div className="flex text-[12px] font-500 leading-[12px] text-[#BFBFBF]">
                            <div className="flex p-2 px-0 gap-[8px] w-[97px] items-center">
                                <AvatarIcon />
                                <span>Requester</span>
                            </div>
                            {!!props.properties.requester && (
                                <div className="flex p-2 gap-[8px] items-center">
                                    <Avatar 
                                        img={props.properties.requester.avatar || ''}
                                        size={16} 
                                    />
                                    <span className="">{props.properties.requester.name}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex text-[12px] font-500 leading-[12px] text-[#BFBFBF]">
                            <div className="flex p-2 px-0 gap-[8px] w-[97px] items-center">
                                <RoundDollarIcon />
                                <span>Reward</span>
                            </div>
                            <div className="flex p-2 gap-[8px] items-center">
                                {props.cost} USDC
                            </div>
                        </div>
                        <div className="flex text-[12px] font-500 leading-[12px] text-[#BFBFBF]">
                            <div className="flex p-2 px-0 gap-[8px] w-[97px] items-center">
                                <FlagBorderIcon />
                                <span>Priority</span>
                            </div>
                            <div className="flex p-2 gap-[8px] items-center">
                                <div className="p-[2px] rounded-[2px]" style={{backgroundColor: CONSTANTS.PRIORITY_COLORS[props.properties.priority]}}>
                                    <FlagIcon size={12} />
                                </div>
                                <span className="">{CONSTANTS.PRIORITY_TEXTS[props.properties.priority]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="flex text-[12px] font-500 leading-[12px] text-[#BFBFBF]">
                            <div className="flex p-2 px-0 gap-[8px] w-[97px] items-center">
                                <CalendarIcon />
                                <span>Due Date</span>
                            </div>
                            <div className="p-2">
                                {props.properties.dueDate}
                            </div>
                        </div>
                        <div className="flex text-[12px] font-500 leading-[12px] text-[#BFBFBF]">
                            <div className="flex p-2 px-0 gap-[8px] w-[97px] items-center">
                                <PaperIcon />
                                <span>Label</span>
                            </div>
                            <div className="flex p-2 gap-[8px] items-center">
                                <Badge 
                                    icon={<div className="w-1 h-1 rounded-full bg-[#E54C26]"></div>}
                                    data={"Bug"}
                                    styles="!rounded-[20px] !text-[12px] !px-[10px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-4 grid gap-2 border-b border-base-200">
                    <h2 className="text-[12px] font-400 leading-[12px] text-base-300">Description</h2>
                    <div className="text-[12px] font-400 text-[#BFBFBF]">{props.description}</div>
                    {/* {props.subTasks.length != 0 && (
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="text-base-content font-400 text-[12px] leading-[20px]">More</div>
                            <DownArrowIcon />
                        </div>
                    )} */}
                </div>
                {/* <div className="py-4 grid gap-2 border-b border-base-200">
                    <h2 className="text-[12px] font-400 leading-[12px] text-base-300">Subtasks</h2>
                    <div className="overflow-hidden w-full">
                        {props.subTasks.map((subtask, index) => (
                            <div 
                                className="px-3 py-2 flex items-center gap-6 justify-between cursor-pointer" 
                                key={index}
                                onClick={() => setSelectedSubTask(index)}
                            >
                                <div className="flex gap-2 items-center">
                                    {STATUS_ICONS[subtask.properties.status]}
                                    <div className="font-400 text-base-content">{subtask.title}</div>
                                </div>
                                <div>
                                    <Avatar img={subtask.properties.assignees[0].img || ''} size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
            {/* {selectedSubTask != null && props.subTasks.length != 0 && !!props.subTasks[selectedSubTask] && (
                <div className="w-[420px] bg-[#191919] border-[#343434] border-l relative">
                    <div className="border-b border-base-200 flex justify-between px-5 py-2">
                        <div className="text-[12px] font-600 text-base-300">{props.subTasks[selectedSubTask].title}</div>
                        <div className="flex gap-2">
                            <div className="flex gap-2 items-center border-r border-base-200 pr-2">
                                <ShareIcon size={14}/>
                                <AttachIcon />
                                <FileShareIcon />
                                <ThreeDotIcon />
                            </div>
                            <div className="flex items-center cursor-pointer" onClick={() => setSelectedSubTask(-1)}>
                                <CloseIcon />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-3 p-3 text-[12px] py-[12px] px-[20px]">
                        <div className="font-600 text-base-300">Activity</div>
                        <div className="grid gap-2">
                            <div className="flex gap-2 items-center">
                                <div className="rounded-full p-1 border border-base-200">
                                    <PlussmIcon />
                                </div>
                                <div className="font-500 text-base-content">Created</div>
                                <div className="font-400 text-[11px] text-base-300">{props.subTasks[selectedSubTask]?.created}</div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex gap-2 items-center">
                                <div className="rounded-full p-1 border border-base-200">
                                    <SlashIcon />
                                </div>
                                <div className="font-500 text-base-content">Last Updated</div>
                                <div className="font-400 text-[11px] text-base-300">{props.subTasks[selectedSubTask]?.lastUpdated}</div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex gap-2 items-center">
                                <Avatar img={props.subTasks[selectedSubTask]?.properties.agents[0].avatar} size={20} />
                                <div className="font-500 text-base-content">{props.subTasks[selectedSubTask]?.properties.agents[0].name}</div>
                                <div className="font-400 text-[11px] text-base-300">{props.subTasks[selectedSubTask]?.lastUpdated}</div>
                            </div>
                            <div className="text-[12px] text-base-300 font-400">
                                I can definitely write a document about Familiarizing yourself with FormsWise.AI and its features for creating detailed and functional assessments. I will get working on that now!
                                just wanted to let you know that I have completed the task you assigned me. Check out the new doc I created on using FormsWise.AI for creating assessments: Exploring FormsWise.AI. Hope it helps!
                            </div>
                        </div>
                    </div>
                    <div className="absolute bg-[#191919] bottom-0 border-t border-base-200 items-end left-0 right-0 p-3 flex gap-2">
                        <Avatar img={props.subTasks[selectedSubTask].properties.assignees[0].img || ""} size={23} />
                        <ChatInputSm />
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default DetailRequest;