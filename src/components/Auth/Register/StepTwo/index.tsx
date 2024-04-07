import React, { useState } from "react";
import RegisterTitle from "../RegisterTitle";
import { PrimaryBorderButton, PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";
import { UploadAvatar } from "@/components/Common/Avatars";
import { Input, Select } from "@/components/Common/Inputs";
import { LOCATIONS_OPTION } from "@/data/global";
import LinkCard from "@/components/Common/Cards/LinkCard";
import { DiscordIcon, GitHubIcon, LeftArrowIcon, TwitterIcon } from "@/components/Icons";

const StepTwo = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    
    const dispatch = useAppDispatch();
    const nextStep = () => {
        dispatch(setRegisterStep(3));
    }

    const backStep = () => {
        dispatch(setRegisterStep(1));
    }

    return (
        <div className="">
            <RegisterTitle title="Profile Info" styles="mb-[16px]" />
            <div className="grid mb-[24px] gap-[24px]">
                <div className="">
                    <UploadAvatar />
                </div>
                <div className="grid gap-[12px] w-full">
                    <div className="text-base-300 text-[14px] font-500">
                        Name
                    </div>
                    <Input
                        value={name}
                        setValue={setName}
                        disabled={false}
                        placeholder={"Write here"}
                    />
                </div>
                <div className="grid gap-[12px]">
                    <div className="text-base-300 text-[14px] font-500">
                        Where are you from 
                    </div>
                    <Select 
                        value={location}
                        setValue={setLocation}
                        disabled={false}
                        options={LOCATIONS_OPTION}
                    />
                </div>
                <div className="grid gap-[12px]">
                    <div className="text-base-300 text-[14px] font-500">
                        Link Account
                    </div>
                    <div className="flex gap-2">
                        <LinkCard 
                            key={0}
                            title={"Github"}
                            icon={<GitHubIcon />}
                            selected={true}
                        />
                        <LinkCard 
                            key={1}
                            title={"Twitter"}
                            icon={<TwitterIcon />}
                            selected={false}
                        />
                        <LinkCard 
                            key={2}
                            title={"Discord"}
                            icon={<DiscordIcon />}
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

export default StepTwo;