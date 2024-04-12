import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    const [userInfo, setUserInfo] = useState<any>({});
    const [agents, setAgents] = useState<any>([]);

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
                await setUserInfo(response.data);
            } catch (error) {}
        }
        const fetchAgents = async () => {
            try {
                const response = await apiCaller.get('/api/agents/');
                setAgents(response.data);
            } catch (error) {}
        }
        fetchProfile()
        fetchAgents()
    }, [])
    const nextStep = async () => {
        await apiCaller.post('/auth/register/', {
            wallet_address: localStorage.getItem('publickey'),
            wallet_type: localStorage.getItem('type'),
            agents: agents.filter((s: any) => s.selected).map((s: any) => s.name),
            step: "5"
        });
        dispatch(setRegisterStep(6));
    }

    const backStep = () => {
        dispatch(setRegisterStep(4));
    }

    const setAgent = useCallback((_id: string) => {
        setAgents((prevAgents: any) => {
            return prevAgents.map((agent: any) => {
              if (agent._id === _id) {
                return { ...agent, selected: !!!agent.selected };
              }
              return agent; // Return unchanged object for other daos
            });
        });
    }, [setAgents])

    const agentsDiv = useMemo(() => {
        return !!agents && agents.map((agent: any, index: number) => (
            <div 
                className="flex px-[12px] py-[6px] cursor-pointer gap-2 items-center border border-base-200 rounded-full" 
                style={{color: agent.selected ? "#F2F2F2": "#929292"}} 
                onClick={() => setAgent(agent._id)}
                key={index}
            >
                {<Image 
                    src={agent.img} 
                    className="rounded-full"
                    alt="Agent" 
                    width={24} 
                    height={24} 
                />}
                <div className="text-[14px] font-500">
                    {agent.name}
                </div>
                {agent.selected ? <CrossIcon />: <PlusIcon />}
            </div>
        ))
    }, [agents]);

    return (
        <div className="">
            <div className="grid mb-[24px] gap-[24px]">
                <div className="grid gap-[12px] w-full">
                    <RegisterTitle title="What AI tools are you proficient in?" styles="mb-[16px]" />
                    <div className="flex gap-4 flex-wrap">
                        {agentsDiv}
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