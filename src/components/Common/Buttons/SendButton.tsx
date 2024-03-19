'use client'

import { PaperAirplaneIcon, StopCircleIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading } from "@/redux/slices/chatSlice";
import React from "react";

const SendButton = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.chat);

    const sendMessage = () => {
        dispatch(setLoading(!loading));
    }

    return (
        <div className="cursor-pointer hover:text-primary opacity-70" onClick={sendMessage}>
            {loading ? (
                <StopCircleIcon />
            ) : (
                <PaperAirplaneIcon />
            )}
        </div>
    );
}

export default SendButton;