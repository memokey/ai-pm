import { Avatar } from "@/components/Common/Avatars";
import { Badge } from "@/components/Common/Badges";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import { ClipboardIcon, HandThumbDownIcon, HandThumbUpIcon, RightArrowIcon, RoundedSquareIcon } from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import React from "react";
import TaskBoard from "../TaskBoard";

export type MessageType = {
    message?: string;
    title?: string;
    type: boolean;
    action?: number;
}

const Message = (props:MessageType) => {
    if(props.type === CONSTANTS.USER_MESSAGE_TYPE) {
        return (
            <div className="flex gap-6 items-start">
                <Avatar 
                    img={`/tmp/avatars/user.png`}
                    size={24}
                />
                <div className="text-[16px] font-[400] text-base-content leading-[24px]">
                    {props.message}
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
                        <div className="text-[16px] font-[400] text-base-content leading-[24px]">
                            {props.title}
                        </div>
                    )}
                    {!!props.message && (
                        <div className="text-[16px] font-[400] text-base-300 leading-[24px]">
                            {props.message}
                        </div>
                    )}
                    {props.action === CONSTANTS.DETAIL_ACTION && (
                        <div>
                            <BaseButton 
                                type={false}
                                caption="Show Detailed Report"
                                icon={<RightArrowIcon />}
                            />
                        </div>
                    )}
                    {props.action === CONSTANTS.METRIX_ACTION && (
                        <div className="flex gap-[10px]">
                            {['Time: 5h', 'AI Agents: 4', 'Humans: 3', 'Expense: 55$'].map((title, index) => (
                                <Badge 
                                    key={index}
                                    title={title}
                                />
                            ))}
                        </div>
                    )}
                    {props.action === CONSTANTS.TASKS_ACTION && (
                        <div className="w-full">
                            <TaskBoard />
                        </div>
                    )}
                    {props.action !== CONSTANTS.TASKS_ACTION && (
                        <div className="grid gap-2">
                            <div className="text-[16px] font-[400] text-base-300 leading-[24px]">
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