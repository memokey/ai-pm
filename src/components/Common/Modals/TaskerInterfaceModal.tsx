"use client";

import { BigXIcon, PlayIcon, PlussmIcon, SlashIcon } from "@/components/Icons";
import { setBaseModoal, setModal } from "@/redux/slices/chatSlice";
import { setTaskerModal } from "@/redux/slices/taskerSlice";
import React, { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { TaskerBox } from "../Cards";
import { Avatar } from "../Avatars";
import { TaskType } from "@/data/types/type";
import { ChatInputSm } from "../Inputs";
import { PrimaryBorderButton, PrimaryButton } from "../Buttons";
import { setExecuteModal } from "@/redux/slices/taskSlice";

export type ModalType = {
    title: string;
    task: TaskType;
};

const TaskerInterfaceModal = (props: ModalType) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const closeDlg = (e: any) => {
        if (
            !!e.target.className.includes &&
            e.target.className.includes("room_setting_dlg")
        ) {
            dispatch(setExecuteModal(false));
        }
    };

    const sendMessage = () => {};

    return (
        <div
            className="fixed top-[0px] left-[0px] right-[0px] bottom-[0px] backdrop-blur-[20px] z-[1002] justify-center items-center room_setting_dlg"
            onClick={(e) => closeDlg(e)}
        >
            <div className="w-[70vw] h-[92vh] mt-[5vh] rounded-[6px] top-10 bg-[#191919] shadow-[#141414] shadow-lg border border-[#212121] mx-auto">
                <div className="flex justify-between px-5 py-4 text-base-content text-[14px] font-500 leading-[20px] border-b border-base-200">
                    <h2 className="">{props.title}</h2>
                    <div className="flex gap-4">
                        <PrimaryButton
                            caption="Submit Task"
                            icon={<></>}
                            type={false}
                        />
                        <PrimaryBorderButton
                            caption="Close"
                            icon={<></>}
                            type={false}
                            onClick={() => {
                                dispatch(setTaskerModal(false));
                            }}
                        />
                    </div>
                </div>
                <div className="text-[13px] text-base-300 py-4 px-5 grid gap-2">
                    <div className="flex gap-2 h-[calc(45vh-46px)]">
                        <TaskerBox title="Description" key={0}>
                            <div className="py-5 px-4">
                                {props.task.description}
                            </div>
                        </TaskerBox>
                        <TaskerBox title="Videos" key={1}>
                            <div className="relative w-full h-full">
                                <img
                                    src="/tmp/utils/taskerVideo.png"
                                    alt="video"
                                    className="w-full h-full"
                                />
                                <div className="absolute top-[15vh] left-[calc(27vh-10px)]">
                                    <div className="flex w-[42px] h-[42px] items-center justify-center border border-base-content rounded-full">
                                        <PlayIcon />
                                    </div>
                                </div>
                            </div>
                        </TaskerBox>
                    </div>
                    <div className="flex gap-2 h-[calc(45vh-46px)]">
                        <TaskerBox
                            title="Documentation"
                            onEdit={setIsEdit}
                            key={0}
                        >
                            <div
                                className={`h-[calc(45vh-90px)] w-full bg-[#111] ${
                                    isEdit ? "" : "p-3"
                                }`}
                            >
                                {isEdit ? (
                                    <textarea
                                        name=""
                                        className="textarea w-full h-full"
                                    ></textarea>
                                ) : (
                                    <code>
                                        <pre></pre>
                                    </code>
                                )}
                            </div>
                        </TaskerBox>
                        <TaskerBox title="Activity" key={1}>
                            <div className="relative w-full h-[calc(45vh-90px)] overflow-hidden">
                                <div className="grid gap-3 p-3 text-[12px]">
                                    <div className="font-600 text-base-300 h-[calc(45vh-140px)]">
                                        Activity
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="rounded-full p-1 border border-base-200">
                                                <PlussmIcon />
                                            </div>
                                            <div className="font-500 text-base-content">
                                                Created
                                            </div>
                                            <div className="font-400 text-[11px] text-base-300">
                                                {props.task.created}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="rounded-full p-1 border border-base-200">
                                                <SlashIcon />
                                            </div>
                                            <div className="font-500 text-base-content">
                                                Last Updated
                                            </div>
                                            <div className="font-400 text-[11px] text-base-300">
                                                {props.task.lastUpdated}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex gap-2 items-center">
                                            {/* <Avatar
                                                img={
                                                    props.task.properties
                                                        .agents[0].avatar
                                                }
                                                size={20}
                                            /> */}
                                            {/* <div className="font-500 text-base-content">
                                                {
                                                    props.task.properties
                                                        .agents[0].name
                                                }
                                            </div> */}
                                            <div className="font-400 text-[11px] text-base-300">
                                                {props.task.lastUpdated}
                                            </div>
                                        </div>
                                        <div className="text-[12px] text-base-300 font-400">
                                            Make sure all items in the list are
                                            related to each other.
                                            <br />
                                            <br />
                                            Use the same font and margin width
                                            in each bulleted point.
                                            <br />
                                            <br />
                                            Keep bullet points short, preferably
                                            no more than three lines long.
                                            <br />
                                            Begin all items with the same part
                                            of speech (active verbs work well)
                                            and make sure they are in parallel
                                            form Make sure all items in the list
                                            are related to each other.
                                            <br />
                                            <br />
                                            Use the same font and margin width
                                            in each bulleted point.
                                            <br />
                                            <br />
                                            Keep bullet points short, preferably
                                            no more than three lines long.
                                            <br />
                                            Begin all items with the same part
                                            of speech (active verbs work well)
                                            and make sure they are in parallel
                                            form Make sure all items in the list
                                            are related to each other.
                                            <br />
                                            <br />
                                            Use the same font and margin width
                                            in each bulleted point.
                                            <br />
                                            <br />
                                            Keep bullet points short, preferably
                                            no more than three lines long.
                                            <br />
                                            Begin all items with the same part
                                            of speech (active verbs work well)
                                            and make sure they are in parallel
                                            form
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bg-[#212121] bottom-0 border-t border-base-200 items-end left-0 right-0 p-3 flex gap-2">
                                    <ChatInputSm
                                        sendMessage={sendMessage}
                                        message={message}
                                        setMessage={setMessage}
                                    />
                                </div>
                            </div>
                        </TaskerBox>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskerInterfaceModal;
