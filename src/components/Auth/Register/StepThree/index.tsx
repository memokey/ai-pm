import React, { useState } from "react";
import RegisterTitle from "../RegisterTitle";
import { PrimaryBorderButton, PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";
import LinkCard from "@/components/Common/Cards/LinkCard";
import { LeftArrowIcon } from "@/components/Icons";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import Image from "next/image";

const StepThree = () => {
    
    const dispatch = useAppDispatch();
    const nextStep = () => {
        dispatch(setRegisterStep(4));
    }

    const backStep = () => {
        dispatch(setRegisterStep(2));
    }

    return (
        <div className="">
            <div className="grid mb-[24px] gap-[24px]">
                <div className="grid gap-[12px] w-full">
                    <RegisterTitle title="Are you part of any dao’s?" styles="mb-[8px]" />
                    <div className="flex gap-4">
                        <BaseButton 
                            key={0}
                            caption="Yes"
                            type={false}
                            styles="!px-[40px] !py-[8px] !bg-[#191919] border border-base-200"
                        />
                        <BaseButton 
                            key={1}
                            caption="No"
                            type={false}
                            styles="!px-[40px] !py-[8px] !bg-[#191919] border border-base-200"
                        />
                    </div>
                </div>
                <div className="grid gap-[12px]">
                    <RegisterTitle title="Which One?" styles="mb-[8px]" />
                    <div className="flex gap-2">
                        <LinkCard 
                            key={0}
                            title={"Superteam"}
                            icon={
                                <Image 
                                    src="/tmp/avatars/superteam.png" 
                                    className="rounded-full"
                                    alt="superteam" 
                                    width={24} 
                                    height={24} 
                                />
                            }
                            selected={false}
                        />
                        <LinkCard 
                            key={1}
                            title={"76 Devs"}
                            icon={
                                <Image 
                                    src="/tmp/avatars/76.png" 
                                    className="rounded-full"
                                    alt="superteam" 
                                    width={24} 
                                    height={24} 
                                />
                            }
                            selected={false}
                        />
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

export default StepThree;