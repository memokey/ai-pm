'use client'

import { BigXIcon, PlayIcon, PlussmIcon, SlashIcon } from "@/components/Icons";
import { setBaseModoal, setModal } from "@/redux/slices/chatSlice";
import { setTaskerModal } from "@/redux/slices/taskerSlice";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { TaskerBox } from "../Cards";
import { Avatar } from "../Avatars";
import { TaskType } from "@/data/types/type";
import { ChatInputSm } from "../Inputs";
import { PrimaryBorderButton, PrimaryButton } from "../Buttons";

export type ModalType = {
    title: string;
    task: TaskType;
}

const TaskerInterfaceModal = (props:ModalType) => {
    const dispatch = useDispatch()
    const closeDlg = (e: any) => {
        if (!!e.target.className.includes && e.target.className.includes("room_setting_dlg")) {
            dispatch(setTaskerModal(false));
        }
    }

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
                            caption="Approve Task"
                            icon={<></>}
                            type={false}
                        />
                        <PrimaryBorderButton 
                            caption="Reject Task"
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
                        <TaskerBox title="Instructions" key={0}>
                            <div className="py-5 px-4">
                                Make sure all items in the list are related to each other.<br /><br />
                                Use the same font and margin width in each bulleted point.<br /><br />
                                Keep bullet points short, preferably no more than three lines long.<br />
                                Begin all items with the same part of speech (active verbs work well) and make sure they are in parallel form.
                            </div>
                        </TaskerBox>
                        <TaskerBox title="Videos" key={1}>
                            <div className="relative w-full h-full">
                                <img src="/tmp/utils/taskerVideo.png" alt="video" className="w-full h-full" />
                                <div className="absolute top-[15vh] left-[calc(27vh-10px)]">
                                    <div className="flex w-[42px] h-[42px] items-center justify-center border border-base-content rounded-full">
                                        <PlayIcon />
                                    </div>
                                </div>
                            </div>
                        </TaskerBox>
                    </div>
                    <div className="flex gap-2 h-[calc(45vh-46px)]">
                        <TaskerBox title="Benchmarki.py" key={0}>
                            <div className="h-[calc(45vh-90px)] w-full bg-[#111] p-3">
                                <code>
      <pre>
        {`print ("hello")
print ("and how are you")
print ("hi kem cho")

print ("""here's an exact
        boy
        how are you""")`}
      </pre>
    </code>
                            </div>
                        </TaskerBox>
                        <TaskerBox title="Activity" key={1}>
                            <div className="relative w-full h-[calc(45vh-90px)] overflow-y-auto">
                                <div className="grid gap-3 p-3 text-[12px]">
                                    <div className="font-600 text-base-300">Activity</div>
                                    <div className="grid gap-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="rounded-full p-1 border border-base-200">
                                                <PlussmIcon />
                                            </div>
                                            <div className="font-500 text-base-content">Created</div>
                                            <div className="font-400 text-[11px] text-base-300">{props.task.created}</div>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="rounded-full p-1 border border-base-200">
                                                <SlashIcon />
                                            </div>
                                            <div className="font-500 text-base-content">Last Updated</div>
                                            <div className="font-400 text-[11px] text-base-300">{props.task.lastUpdated}</div>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex gap-2 items-center">
                                            <Avatar img={props.task.properties.agents[0].avatar} size={20} />
                                            <div className="font-500 text-base-content">{props.task.properties.agents[0].name}</div>
                                            <div className="font-400 text-[11px] text-base-300">{props.task.lastUpdated}</div>
                                        </div>
                                        <div className="text-[12px] text-base-300 font-400">
                                        Make sure all items in the list are related to each other.<br /><br />
                                Use the same font and margin width in each bulleted point.<br /><br />
                                Keep bullet points short, preferably no more than three lines long.<br />
                                Begin all items with the same part of speech (active verbs work well) and make sure they are in parallel form
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bg-[#212121] bottom-0 border-t border-base-200 items-end left-0 right-0 p-3 flex gap-2">
                                    <Avatar img={props.task.properties.assignees[0].img || ""} size={23} />
                                    <ChatInputSm />
                                </div>
                            </div>
                        </TaskerBox>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default TaskerInterfaceModal;