'use client'

import React, { ReactNode } from "react"
import { BigXIcon } from "@/components/Icons";
import { setAgentModal } from "@/redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { AGENTS, REVIEWERS } from "@/data/global";
import { AgentCard } from "../Cards";

export type ModalType = {
    title: string;
    button?: ReactNode;
    close?: any;
}

const AgentsModal = (props:ModalType) => {
    const dispatch = useDispatch()
    const closeDlg = (e: any) => {
        if (!!e.target.className.includes && e.target.className.includes("room_setting_dlg")) {
            dispatch(setAgentModal(false));
        }
    }

    return (
        <div 
            className="fixed top-[0px] left-[0px] right-[0px] bottom-[0px] backdrop-blur-[20px] z-[1002] justify-center items-center room_setting_dlg"
            onClick={(e) => closeDlg(e)}
        >
            <div className="w-[40%] mt-[10vh] p-6 rounded-[6px] top-10 bg-[#1C1C1C] grid gap-4 shadow-[#141414] shadow-md mx-auto">
                <div className="flex justify-between text-base-content text-[16px] font-600 leading-[20px]">
                    <h2 className="">{props.title}</h2>
                    <span 
                        className="cursor-pointer" 
                        onClick={() => dispatch(setAgentModal(false))}
                    ><BigXIcon /></span>
                </div>
                <div className="text-[13px] text-base-300 font-400 leading-[20px] max-h-[50vh] overflow-auto">
                    <div className="grid gap-3">
                        {AGENTS.map((agent, index) => (
                            <AgentCard
                                key={index}
                                {...agent}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default AgentsModal;