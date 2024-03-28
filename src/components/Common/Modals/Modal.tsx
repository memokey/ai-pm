'use client'

import { BigXIcon } from "@/components/Icons";
import { setBaseModoal, setModal } from "@/redux/slices/chatSlice";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";

export type ModalType = {
    title: string;
    button?: ReactNode;
    children: ReactNode;
    close?: any;
}

const Modal = (props:ModalType) => {
    const dispatch = useDispatch()
    const closeDlg = (e: any) => {
        if (e.target.class == 'room_setting_dlg') {
            dispatch(setModal(false));
        }
    }

    return (
        <div 
            className="fixed top-[0px] left-[0px] right-[0px] bottom-[0px] backdrop-blur-[20px] z-[1002] justify-center items-center room_setting_dlg"
            onClick={(e) => closeDlg(e)}
        >
            <div className="w-[40%] mt-[10vh] p-6 rounded-[6px] top-10 bg-[#212121] grid gap-2 shadow-[#2a2a2a] shadow-md mx-auto">
                <div className="flex justify-between text-base-content text-[16px] font-600 leading-[20px]">
                    <h2 className="">{props.title}</h2>
                    <span 
                        className="cursor-pointer" 
                        onClick={() => dispatch(setModal(false))}
                    ><BigXIcon /></span>
                </div>
                <div className="text-[13px] text-base-300 font-400 leading-[20px] h-[50vh] overflow-auto">
                    {props.children}
                </div>
            </div>
        </div>
    ); 
}

export default Modal;