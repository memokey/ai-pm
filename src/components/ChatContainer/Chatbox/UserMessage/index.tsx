'use client'

import { Avatar } from "@/components/Common/Avatars";
import { Badge } from "@/components/Common/Badges";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import { CheckClipboardIcon, ClipboardIcon, HandThumbDownIcon, HandThumbUpIcon, PlayIcon, RightArrowIcon, RoundedSquareIcon } from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import React, { useState } from "react";
import TaskBoard from "../TaskBoard";
import BaseCard from "@/components/Common/Cards/BaseCard";
import { METRIX } from "@/data/global";
import { useAppDispatch } from "@/redux/hooks";
import { setBaseModoal } from "@/redux/slices/chatSlice";
import { DepositButton } from "@/components/Escrow/DepositButton";
import { PrimaryBorderButton } from "@/components/Common/Buttons";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';

export type MessageType = {
    id?: string;
    message?: string;
    title?: string;
    type: boolean;
    action?: number;
    tasks?: any[];
    is_final_outline?: boolean;
    history?: any[];
}

const Message = (props:MessageType) => {
    const dispatch = useAppDispatch();
    const [isClipboard, setIsClipboard] = useState(false);
    const convertToFormattedText = (text: string) => {
        return text.replaceAll("**", '')
    }

    const copyClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }
    
    if(props.type === CONSTANTS.USER_MESSAGE_TYPE) {
        return (
            <div className="flex gap-6 items-start">
                <Avatar 
                    img={`/tmp/avatars/user.png`}
                    size={24}
                />
                <div className="text-[16px] font-[400] text-base-300 leading-[24px] group w-[calc(100vw-800px)] break-words">
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
                <div className="grid gap-4 w-[calc(100vw-800px)] overflow-x-auto">
                    {!!props.title && (
                        <div className="text-[16px] font-[400] text-base-300 leading-[24px]">
                            {props.title}
                        </div>
                    )}
                    {!!props.message && (
                        <div className="text-[16px] font-[400] text-base-300 leading-[24px] rounded-[8px]">
                            <pre className="font-outer max-w-[calc(100vw-356px)] break-words overflow-auto">
                                {convertToFormattedText(props.message)}
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
                        <div>
                            <div className="w-full grid gap-4 mb-4">
                                <TaskBoard tasks={props.tasks}/>
                            </div>
                            <div className="w-full grid gap-4">
                                <div className="flex gap-6 items-start">
                                    <Avatar 
                                        img={`/images/avatars/bot.png`}
                                        size={24}
                                    />
                                    <div className="text-[16px] font-[400] text-base-300 leading-[24px] group w-[calc(100vw-800px)] break-words">
                                        Could you provide more details regarding the features you like to add? Additionally, it would be helpful to know the backend language you are considering, among other requirements.
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="relative w-[30vw] h-[37vh] rounded-[8px]">
                                        <div className=""></div>
                                        <img src="/tmp/utils/taskerVideo.png" alt="video" className="w-full h-full rounded-[8px]" />
                                        <div className="absolute top-[16vh] left-[calc(30vh-10px)]">
                                            <div className="flex w-[42px] h-[42px] items-center justify-center border border-base-content rounded-full">
                                                <PlayIcon />
                                            </div>
                                        </div>
                                    </div>
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
                                    <div className="text-[16px] font-[400] text-base-content leading-[24px]">
                                        Will this plan work for you? 
                                    </div>
                                    <div className="flex gap-[10px]">
                                        <div className="flex gap-2">
                                            <DepositButton />
                                            <PrimaryBorderButton 
                                                caption="Reject"
                                                type={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-2">
                        {/* <div className="cursor-pointer hover:text-primary">
                            <RoundedSquareIcon />
                        </div> */}
                        <div 
                            className="cursor-pointer hover:text-primary" 
                            onClick={() => {
                                copyClipboard(convertToFormattedText(props.message || ''));
                                setIsClipboard(true);
                                setTimeout(() => {
                                    setIsClipboard(false);
                                }, 1000)
                            }}
                        >
                            {isClipboard ? (
                                <CheckClipboardIcon />
                            ): (
                                <ClipboardIcon />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Message;