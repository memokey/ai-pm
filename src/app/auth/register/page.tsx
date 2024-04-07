'use client'

import OnboardingFinal from "@/components/Auth/Register/OnboardingFinal";
import RegisterProcess from "@/components/Auth/Register/RegisterProcess";
import StepFive from "@/components/Auth/Register/StepFive";
import StepFour from "@/components/Auth/Register/StepFour";
import StepOne from "@/components/Auth/Register/StepOne";
import StepThree from "@/components/Auth/Register/StepThree";
import StepTwo from "@/components/Auth/Register/StepTwo";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";

const RegisterPage = () => {
    const { registerStep } = useAppSelector((state) => state.auth);
    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden">
            <div className="w-[640px] mt-[120px] mx-auto rounded-[15px] border border-base-200 p-10">
                {registerStep != 6 && (
                    <RegisterProcess 
                        step={registerStep}
                    />
                )}
                {registerStep == 1 && (
                    <StepOne />
                )}
                {registerStep == 2 && (
                    <StepTwo />
                )}
                {registerStep == 3 && (
                    <StepThree />
                )}
                {registerStep == 4 && (
                    <StepFour />
                )}
                {registerStep == 5 && (
                    <StepFive />
                )}
                {registerStep == 6 && (
                    <OnboardingFinal />
                )}
            </div>
        </div>
    );
}

export default RegisterPage;