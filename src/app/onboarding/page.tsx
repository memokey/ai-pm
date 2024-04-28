'use client'

import OnboardingFinal from "@/components/Auth/Register/OnboardingFinal";
import RegisterProcess from "@/components/Auth/Register/RegisterProcess";
import StepFour from "@/components/Auth/Register/StepFour";
import StepTwo from "@/components/Auth/Register/StepTwo";
import { useAppSelector } from "@/redux/hooks";
import React, { useMemo } from "react";

const Onboarding = () => {
    const { registerStep } = useAppSelector((state) => state.auth);
    const registerSteps = useMemo(() => {
        switch(registerStep) {
            case 1:
                return <StepTwo />;
            case 2:
                return <StepFour />;
            case 3:
                return <OnboardingFinal />;
            default:
                return null;
        }
    }, [registerStep]);

    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden">
            <div className="w-[640px] mt-[120px] mx-auto rounded-[15px] border border-base-200 p-10">
                {registerStep != 4 && (
                    <RegisterProcess 
                        step={registerStep}
                    />
                )}
                {registerSteps}
            </div>
        </div>
    );
}

export default Onboarding;