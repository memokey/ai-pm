"use client";

import { PaperAirplaneIcon, StopCircleIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading } from "@/redux/slices/chatSlice";
import React from "react";
import { SendButtonType } from "./SendButton";

const SendButtonSm = (props: SendButtonType) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.chat);

  return (
    <div
      className="cursor-pointer p-[4px] rounded-[4px] bg-primary opacity-70"
      onClick={props.sendMessage}
    >
      {loading ? (
        <StopCircleIcon size={8.5} />
      ) : (
        <div className="text-white">
          <PaperAirplaneIcon size={8.5} />
        </div>
      )}
    </div>
  );
};

export default SendButtonSm;
