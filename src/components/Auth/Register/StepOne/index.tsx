import React, { useState } from "react";
import RegisterTitle from "../RegisterTitle";
import RegisterBox from "../RegisterBox";
import { LargeChatIcon, TVIcon } from "@/components/Icons";
import { PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";

const StepOne = () => {
    const [role, setRole] = useState('tasker')
    const dispatch = useAppDispatch();
    const nextStep = () => {
        dispatch(setRegisterStep(2));
    }

    return (
        <div className="">
            <RegisterTitle title="Please Choose your role" styles="mb-[16px]" />
            <div className="flex mb-[24px] gap-4">
                <RegisterBox
                    icon={<TVIcon />}
                    title="Tasker"
                    description={"Build truly open, choose the executive direction and see magic happen. In the most efficient way possible."}
                    active={role == "tasker"}
                    onClick={() => setRole('tasker')}
                />
                <RegisterBox
                    icon={<LargeChatIcon />}
                    title="Requestor"
                    description={"Complete tasks, build your onchain resume, build up your skills and earn for your work."}
                    active={role == "requestor"}
                    onClick={() => setRole('requestor')}
                />
            </div>
            <div className="flex justify-end">
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

export default StepOne;