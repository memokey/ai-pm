'use client'

import { Avatar } from "@/components/Common/Avatars";
import { Badge } from "@/components/Common/Badges";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import { ClipboardIcon, HandThumbDownIcon, HandThumbUpIcon, RightArrowIcon, RoundedSquareIcon } from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import React from "react";
import TaskBoard from "../TaskBoard";
import BaseCard from "@/components/Common/Cards/BaseCard";
import { METRIX } from "@/data/global";
import { useAppDispatch } from "@/redux/hooks";
import { setBaseModoal } from "@/redux/slices/chatSlice";

export type MessageType = {
    id?: string;
    message?: string;
    title?: string;
    type: boolean;
    action?: number;
}

const Message = (props:MessageType) => {
    const dispatch = useAppDispatch();
    if(props.type === CONSTANTS.USER_MESSAGE_TYPE) {
        return (
            <div className="flex gap-6 items-start">
                <Avatar 
                    img={`/tmp/avatars/user.png`}
                    size={24}
                />
                <div className="text-[16px] font-[400] leading-[24px] group">
                    <pre className="text-base-300">
                        {props.message}
                    </pre>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex gap-6 items-start w-full">
                <Avatar 
                    img={`/images/avatars/bot.png`}
                    size={24}
                />
                <div className="grid gap-4 w-full">
                    {!!props.title && (
                        <div className="text-[16px] font-[400] text-base-300 leading-[24px]">
                            {props.title}
                        </div>
                    )}
                    {!!props.message && (
                        <div className="text-[16px] font-[400] text-base-300 leading-[24px] max-w-[calc(100vw-356px)] overflow-auto bg-[#212121] p-4 rounded-[8px]">
                            <pre>
                                {props.message}
                            </pre>
                        </div>
                    )}
                    {props.action === CONSTANTS.DETAIL_ACTION && (
                        <BaseCard
                            title="Virtual Assistant"
                            description={<p>
                                FormsWise.AI is a powerful software tool that allows users to easily create detailed and functional assessments. With a user-friendly interface and a wide range of features, FormsWise.AI makes the assessment creation process a breeze. In this document, we will explore some of the key features of FormsWise.AI and provide a step-by-step guide on how to create an assessment using this tool.<br/><br/>
                                <b>Getting Started with FormsWise.AI</b><br/><br/>
                                To get started with FormsWise.AI, you first need to create an account. Simply go to the FormsWise.AI website and click on the Sign Up button. Once you have created an account, you can log in to the platform and start exploring its features.
                                The main dashboard of FormsWise.AI displays all the assessments that you have created. If you are a new user, you will see a blank dashboard. To create a new assessment, click on the Create Assessment button.
                                Features of FormsWise.AI
                            </p>}
                            button={<BaseButton 
                                caption="View Report"
                                type={false}
                                icon={<RightArrowIcon />}
                                onClick={() => dispatch(setBaseModoal(true))}
                            />}
                        />     
                    )}
                    {props.action === CONSTANTS.TASKS_ACTION && (
                        <div className="w-full grid gap-4">
                            <div className="flex gap-[10px]">
                                {METRIX.map((badge, index) => (
                                    <Badge 
                                        key={index}
                                        icon={badge.icon}
                                        title={badge.title}
                                        data={badge.data}
                                    />
                                ))}
                            </div>
                            <TaskBoard />
                        </div>
                    )}
                    {props.action !== CONSTANTS.TASKS_ACTION && (
                        <div className="grid gap-2">
                            <div className="text-[16px] font-[400] text-base-content leading-[24px]">
                                Will this plan work for you?
                            </div>
                            <div className="flex gap-[10px]">
                                <BaseButton 
                                    type={true}
                                    caption="Yes"
                                    icon={<div className="text-success"><HandThumbUpIcon /></div>}
                                />
                                <BaseButton 
                                    type={true}
                                    caption="No"
                                    icon={<div className="text-error"><HandThumbDownIcon /></div>}
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <div className="cursor-pointer hover:text-primary">
                            <RoundedSquareIcon />
                        </div>
                        <div className="cursor-pointer hover:text-primary">
                            <ClipboardIcon />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Message;