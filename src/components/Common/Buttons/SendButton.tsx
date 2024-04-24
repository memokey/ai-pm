'use client'

import { PaperAirplaneIcon, StopCircleIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

export type SendButtonType = {
    sendMessage: any;
}

const SendButton = (props: SendButtonType) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.chat);

    return (
        <div className="cursor-pointer hover:text-primary opacity-70" onClick={() => {
            props.sendMessage();
        }}>
            {loading ? (
                <StopCircleIcon />
            ) : (
                <PaperAirplaneIcon />
            )}
        </div>
    );
}

export default SendButton;