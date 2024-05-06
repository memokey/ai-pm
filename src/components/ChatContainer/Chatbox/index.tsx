import React, { useEffect } from "react";
import { CONSTANTS } from "@/config/constants";
import Message from "./UserMessage";
import { CARD_PROMPTS, METRIX } from "@/data/global";
import { PromptCard } from "@/components/Common/Cards";
import { useAppSelector } from "@/redux/hooks";
import TaskBoard from "./TaskBoard";
import { Avatar } from "@/components/Common/Avatars";
import { PlayIcon } from "@/components/Icons";
import { Badge } from "@/components/Common/Badges";
import { DepositButton } from "@/components/Escrow/DepositButton";
import { PrimaryBorderButton } from "@/components/Common/Buttons";

const Chatbox = () => {
    const { messages, streamingFlag, streamingMessage, loading, tasks } =
        useAppSelector((state) => ({
            messages: state.chat.messages,
            streamingFlag: state.chat.streamingFlag,
            streamingMessage: state.chat.streamingMessage,
            loading: state.chat.loading,
            tasks: state.task.tasks,
        }));

    return (
        <div className="grid gap-6 w-full">
            {messages.length === 0 && (
                <div className="grid gap-4 w-full">
                    <h1 className="text-[36px] font-[400] traking-tighter">
                        Hello,
                        <span className="name-linear font-[700]">Thomas</span>
                        &nbsp;what do you want to create?
                    </h1>
                    <p className="text-[16px] font-[400] leading-[30px] text-base-300">
                        Please Write down task along with description for AI so
                        we can generate detail report for you.
                    </p>
                    <div className="flex gap-4">
                        {CARD_PROMPTS.map((prompt, index) => (
                            <PromptCard key={index} {...prompt} />
                        ))}
                    </div>
                </div>
            )}
            {messages.map((msg, index) => (
                <Message
                    key={index}
                    type={msg.type}
                    message={msg.message}
                    action={
                        !!msg.tasks && msg.tasks.length != 0
                            ? CONSTANTS.TASKS_ACTION
                            : -1
                    }
                    tasks={msg.tasks}
                />
            ))}
            {!loading && tasks.length != 0 && (
                <div>
                    <div className="w-full grid gap-4 mb-4">
                        <TaskBoard tasks={tasks} />
                    </div>
                    <div className="w-full grid gap-4">
                        <div className="grid gap-2">
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
            {streamingFlag && (
                <Message
                    key={"bot111"}
                    type={CONSTANTS.BOT_MESSAGE_TYPE}
                    message={streamingMessage}
                />
            )}
            {/* <Message
                type={CONSTANTS.USER_MESSAGE_TYPE}
                message={`I need Virtual Assistant for Company Assessment FormCreation:\nCreate comprehensive assessments using FormsWise.AI tailored to BEF’s requirements.\nIntegrate assessment forms with n8n to automate workflows, including data capture and processing.
                Set up and maintain integrations between FormsWise.AI, Google Sheets, and Google Docs to ensure seamless data flow and accessibility.\nManage and configure API keys securely and efficiently.
                Embed forms onto BEF’s website and other digital platforms as needed, ensuring a smooth user experience. Troubleshoot any issues related to form integrations or data management.`}
            />
            <Message 
                type={CONSTANTS.BOT_MESSAGE_TYPE}
                title={`Here is detailed report on how we can proceed?`}
                message={`I need Virtual Assistant for Company Assessment FormCreation: Create comprehensive assessments using FormsWise.AI tailored to BEF’s requirements.`}
                action={CONSTANTS.DETAIL_ACTION}
            />
            <Message
                type={CONSTANTS.USER_MESSAGE_TYPE}
                message={`Yes`}
            />
            <Message 
                type={CONSTANTS.BOT_MESSAGE_TYPE}
                message={`Ok, starting decomposition and assignment`}
                action={CONSTANTS.TASKS_ACTION}
            /> */}
        </div>
    );
};

export default Chatbox;
