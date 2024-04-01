'use client'

import { PaperAirplaneIcon, StopCircleIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading } from "@/redux/slices/chatSlice";
import React from "react";

export type SendButtonType = {
    sendMessage: any;
}

const SendButton = (props: SendButtonType) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.chat);

    const changeState = () => {
        dispatch(setLoading(!loading));
    }

    return (
        <div className="cursor-pointer hover:text-primary opacity-70" onClick={() => {
            props.sendMessage();
            changeState();
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