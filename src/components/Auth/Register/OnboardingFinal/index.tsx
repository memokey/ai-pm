import Image from "next/image";
import React from "react";
import RegisterTitle from "../RegisterTitle";
import { PrimaryButton } from "@/components/Common/Buttons";

const OnboardingFinal = () => {
    return (
        <div className="">
            <div className="flex justify-center mb-[32px]">
                <Image src="/images/utils/onboarding.png" alt="Final" width={332} height={190} />
            </div>
            <div className="flex justify-center mb-[16px]">
                <RegisterTitle title="You are all set! Start with your tasks" />
            </div>
            <div className="text-center text-base-300 text-[16px] font-500 mb-[32px]">
                Please start with your first task and start earning. Let’s Go!
            </div>
            <div className="flex justify-center">
                <PrimaryButton
                    caption="Explore Task Dashboard"
                    type={false}
                    styles="!px-[24px] !py-[8px] !text-[16px]"
                    onClick={() => {}}
                />
            </div>
        </div>
    );
}

export default OnboardingFinal;