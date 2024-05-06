"use client";

import React, { ReactNode, useState } from "react";
import { BigXIcon } from "@/components/Icons";
import { setReviewerModal } from "@/redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { REVIEWERS } from "@/data/global";
import { ReviewerCard } from "../Cards";
import { setIsFeedback, updateTask } from "@/redux/slices/taskSlice";
import { PrimaryButton } from "../Buttons";
import { FiveStarRating } from "../Rating";
import { apiCaller } from "@/utils/fetcher";

export type ModalType = {
    title: string;
    hidden?: string;
    button?: ReactNode;
    close?: any;
};

const FeedbackModal = (props: ModalType) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState<number>(1);
    const [feedback, setFeedback] = useState<string>("");
    const closeDlg = (e: any) => {
        if (
            !!e.target.className.includes &&
            e.target.className.includes("room-setting-feedback-dlg")
        ) {
            dispatch(setIsFeedback(false));
        }
    };

    const submitFeedback = async () => {
        const params = {
            task_id: props.hidden || "",
            is_feedback: true,
            rate: rating,
            content: feedback,
        };
        try {
            const res = await apiCaller.post(
                "/api/tasks/leaveFeedback/",
                params
            );
            dispatch(
                updateTask({
                    taskId: res.data._id,
                    task: res.data,
                })
            );
            dispatch(setIsFeedback(false));
        } catch (error) {
            console.error("Feedback error.");
        }
    };

    return (
        <div
            className="fixed top-[0px] left-[0px] right-[0px] bottom-[0px] backdrop-blur-[20px] z-[1002] justify-center items-center room-setting-feedback-dlg"
            onClick={(e) => closeDlg(e)}
        >
            <div className="w-[40%] mt-[10vh] p-6 rounded-[6px] top-10 bg-[#1C1C1C] grid gap-4 shadow-[#141414] shadow-md mx-auto">
                <div className="flex justify-between text-base-content text-[16px] font-600 leading-[20px]">
                    <h2 className="">{props.title}</h2>
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            dispatch(setIsFeedback(false));
                        }}
                    >
                        <BigXIcon />
                    </span>
                </div>
                <div className="text-[13px] text-base-300 font-400 leading-[20px] max-h-[50vh] overflow-auto">
                    <textarea
                        className="textarea textarea-bordered bg-transparent w-full"
                        rows={7}
                        placeholder="leave a feedback"
                        value={feedback}
                        onChange={(e: any) => setFeedback(e.target.value)}
                    />
                </div>
                <FiveStarRating rating={rating} setRating={setRating} />
                <div className="flex justify-end">
                    <PrimaryButton
                        caption="submit"
                        styles="!py-2 !px-5"
                        type={false}
                        onClick={submitFeedback}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
