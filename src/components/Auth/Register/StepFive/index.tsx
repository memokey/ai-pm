import React, { useState } from "react";
import RegisterTitle from "../RegisterTitle";
import { PrimaryBorderButton, PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";
import LinkCard from "@/components/Common/Cards/LinkCard";
import { CrossIcon, LeftArrowIcon, PlusIcon } from "@/components/Icons";
import Image from "next/image";
import { AI_TOOLS, SKILLS } from "@/data/global";
import { apiCaller } from "@/utils/fetcher";

const StepFive = () => {
    const dispatch = useAppDispatch();
    const nextStep = async () => {
        await apiCaller.post('/auth/register/', {
            wallet_address: localStorage.getItem('publickey'),
            step: "5"
        });
        dispatch(setRegisterStep(6));
    }

    const backStep = () => {
        dispatch(setRegisterStep(4));
    }

    return (
        <div className="">
            <div className="grid mb-[24px] gap-[24px]">
                <div className="grid gap-[12px] w-full">
                    <RegisterTitle title="What AI tools are you proficient in?" styles="mb-[16px]" />
                    <div className="flex gap-4 flex-wrap">
                        {AI_TOOLS.map((tool, index) => (
                            <div 
                                className="flex px-[12px] py-[6px] cursor-pointer gap-2 items-center border border-base-200 rounded-full" 
                                style={{color: tool.selected ? "#F2F2F2": "#929292"}} 
                                key={index}
                            >
                                {tool.icon}
                                <div className="text-[14px] font-500">
                                    {tool.title}
                                </div>
                                {tool.selected ? <CrossIcon />: <PlusIcon />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <PrimaryBorderButton 
                    caption="Back"
                    icon={<LeftArrowIcon />}
                    type={true}
                    onClick={backStep}
                />
                <PrimaryButton
                    caption="Next"
                    type={false}
                    styles="!px-[24px] !py-[8px] !text-[16px]"
                    onClick={nextStep}
                />
                
            </div>
        </div>
    );
}

export default StepFive;