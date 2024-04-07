import React, { useState } from "react";
import RegisterTitle from "../RegisterTitle";
import { PrimaryBorderButton, PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";
import LinkCard from "@/components/Common/Cards/LinkCard";
import { CrossIcon, LeftArrowIcon, PlusIcon } from "@/components/Icons";
import Image from "next/image";
import { SKILLS } from "@/data/global";

const StepFour = () => {
    const dispatch = useAppDispatch();
    const nextStep = () => {
        dispatch(setRegisterStep(5));
    }

    const backStep = () => {
        dispatch(setRegisterStep(3));
    }

    return (
        <div className="">
            <div className="grid mb-[24px] gap-[24px]">
                <div className="grid gap-[12px] w-full">
                    <RegisterTitle title="What are you proficient in?" styles="mb-[16px]" />
                    <div className="flex gap-4 flex-wrap">
                        {SKILLS.map((skill, index) => (
                            <div 
                                className="flex px-[12px] py-[6px] cursor-pointer gap-2 items-center border border-base-200 rounded-full" 
                                style={{color: skill.selected ? "#F2F2F2": "#929292"}} 
                                key={index}
                            >
                                <div className="text-[14px] font-500">
                                    {skill.title}
                                </div>
                                {skill.selected ? <CrossIcon />: <PlusIcon />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid gap-[12px] w-full">
                    <RegisterTitle title="What would you like to improve in?" styles="mb-[16px]" />
                    <div className="flex gap-4 flex-wrap">
                        {SKILLS.slice(0, 7).map((skill, index) => (
                            <div 
                                className="flex px-[12px] py-[6px] cursor-pointer gap-2 items-center border border-base-200 rounded-full" 
                                style={{color: skill.selected ? "#F2F2F2": "#929292"}} 
                                key={index}
                            >
                                <div className="text-[14px] font-500">
                                    {skill.title}
                                </div>
                                {skill.selected ? <CrossIcon />: <PlusIcon />}
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

export default StepFour;