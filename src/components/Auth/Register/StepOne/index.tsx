'use client'

import React, { useEffect, useState } from "react";
import RegisterTitle from "../RegisterTitle";
import RegisterBox from "../RegisterBox";
import { LargeChatIcon, TVIcon } from "@/components/Icons";
import { PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";
import { apiCaller } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

const StepOne = () => {
    const [role, setRole] = useState('tasker');
    const [userInfo, setUserInfo] = useState<any>({});
    const router = useRouter();

    // Fetch profile information after rendering the components.
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiCaller.get('/auth/userByPublicKey', {
                    params: {
                        walletType: localStorage.getItem('type'),
                        publicKey: localStorage.getItem('publickey'),
                    }
                });
                setUserInfo(response.data);
            } catch (error) {}
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        if(!!userInfo.role) {
            setRole(userInfo.user.role);
        }
    }, [userInfo.role])

    const dispatch = useAppDispatch();
    const nextStep = async () => {
        try {
            await apiCaller.post('/auth/register/', {
                wallet_address: localStorage.getItem('publickey'),
                wallet_type: localStorage.getItem('type'),
                role,
                step: "1"
            });
            if(role == "requester") {
                router.push("/");
            }
            dispatch(setRegisterStep(2));
        } catch (error) {
            
        }
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
                    active={role == "requester"}
                    onClick={() => setRole('requester')}
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