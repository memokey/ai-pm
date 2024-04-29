import React, { ReactNode } from "react";
import BaseButton from "../../Buttons/BaseButton";
import { RightArrowIcon } from "@/components/Icons";
import { apiCaller } from "@/utils/fetcher";
import { sendMessage } from "@/redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export type PromptCardType = {
    title: string;
}

const PromptCard = (props: PromptCardType) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { history, taskId } = useAppSelector((state) => ({
        history: state.chat.history,
        taskId: state.task.taskId
    }))

    const send = async (prompt: String) => {
        try {
            const response = await apiCaller.post('/api/tasks/');
            if(!!response.data.taskId) {
                await dispatch(sendMessage({
                    prompt,
                    taskId: response.data.taskId,
                    history,
                    next: () => {}
                }))
                router.push(`/taskboard/${response.data.taskId}/chat`);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
    return (
        <div className="grid gap-4 py-3 px-4 bg-[#2A2A2A] border border-[#343434] shadow-[#141414] shadow-sm rounded-[8px]">
            <div className="grid gap-2">
                <h2 className="text-[16px] text-base-300 font-600 leading-[25px]">
                    {props.title}
                </h2>
            </div>
            <div 
                className="text-base-300 hover:text-base-content cursor-pointer"
                onClick={() => {
                    send(props.title);
                }}
            >
                <RightArrowIcon size={24} />
            </div>
        </div>
    );
}

export default PromptCard;