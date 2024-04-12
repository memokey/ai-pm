'use client'

import OnboardingFinal from "@/components/Auth/Register/OnboardingFinal";
import RegisterProcess from "@/components/Auth/Register/RegisterProcess";
import StepFive from "@/components/Auth/Register/StepFive";
import StepFour from "@/components/Auth/Register/StepFour";
import StepOne from "@/components/Auth/Register/StepOne";
import StepThree from "@/components/Auth/Register/StepThree";
import StepTwo from "@/components/Auth/Register/StepTwo";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useMemo } from "react";

const RegisterPage = () => {
    const { registerStep } = useAppSelector((state) => state.auth);

    const registerSteps = useMemo(() => {
        switch(registerStep) {
            case 1:
                return <StepOne />;
            case 2:
                return <StepTwo />;
            case 3:
                return <StepThree />;
            case 4:
                return <StepFour />;
            case 5:
                return <StepFive />;
            case 6:
                return <OnboardingFinal />;
            default:
                return null;
        }
    }, [registerStep]);

    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden">
            <div className="w-[640px] mt-[120px] mx-auto rounded-[15px] border border-base-200 p-10">
                {registerStep != 6 && (
                    <RegisterProcess 
                        step={registerStep}
                    />
                )}
                {registerSteps}
            </div>
        </div>
    );
}

export default RegisterPage;