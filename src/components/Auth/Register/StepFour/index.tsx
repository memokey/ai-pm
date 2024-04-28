import React, { useCallback, useEffect, useMemo, useState } from "react";
import RegisterTitle from "../RegisterTitle";
import { PrimaryBorderButton, PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";
import LinkCard from "@/components/Common/Cards/LinkCard";
import { CrossIcon, LeftArrowIcon, PlusIcon } from "@/components/Icons";
import Image from "next/image";
import { SKILLS } from "@/data/global";
import { SkillType } from "@/data/types/type";
import { apiCaller } from "@/utils/fetcher";

const StepFour = () => {
    const dispatch = useAppDispatch();

    const [skills, setSkills] = useState<SkillType[]>([]);
    const [desiredSkills, setDesiredSkills] = useState<SkillType[]>([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDesiredOption, setSelectedDesiredOption] = useState('');
    const [userInfo, setUserInfo] = useState<any>({});

    // Fetch profile information after rendering the components.
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiCaller.get('/auth/userByPublicKey', {
                    params: {
                        wallet_type: localStorage.getItem('type'),
                        public_key: localStorage.getItem('publickey'),
                    }
                });
                await setUserInfo(response.data);
            } catch (error) {}
        }
        fetchProfile()
    }, [])

    // Init profile information
    useEffect(() => {
        if(!!userInfo.role) {
            if(!!userInfo.user.skills && userInfo.user.skills.length != 0) {
                setSkills(prevSkills => {
                    return prevSkills.map((skill: SkillType) => {
                        const skillIndex = userInfo.user.skills.findIndex((s: string) => s == skill.name);
                        if (skillIndex != -1) {
                          return { ...skill, selected: true };
                        }
                        return skill; // Return unchanged object for other skills
                      });
                })
            }
            
            if(!!userInfo.user.desired_skills && userInfo.user.desired_skills.length != 0) {
                setDesiredSkills(prevSkills => {
                    return prevSkills.map((skill: SkillType) => {
                        const skillIndex = userInfo.user.desired_skills.findIndex((s: string) => s == skill.name);
                        if (skillIndex != -1) {
                          return { ...skill, selected: true };
                        }
                        return skill; // Return unchanged object for other skills
                      });
                })
            }
        }
    }, [userInfo.role])

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await apiCaller.get('/api/skills/');
                setSkills(response.data);
                setDesiredSkills(JSON.parse(JSON.stringify(response.data)));
            } catch (error) {}
        }
        fetchSkills()
    }, [])

    const nextStep = async () => {
        try {
            const data = {
                wallet_address: localStorage.getItem('publickey'),
                wallet_type: localStorage.getItem('type'),
                skills: skills.filter(s => s.selected).map(skill => skill.name),
                desired_skills: desiredSkills.filter(s => s.selected).map(skill => skill.name),
                step: "2",
            };
            await apiCaller.post('/auth/register/', data);
        } catch (error) {}
        dispatch(setRegisterStep(3));
    }

    const backStep = () => {
        dispatch(setRegisterStep(1));
    }

    const addSkills = useCallback((skillName: string) => {
        setSkills(prevSkills => {
            return prevSkills.map((skill: SkillType) => {
                if (skill.name === skillName) {
                  return { ...skill, selected: !skill.selected };
                }
                return skill; // Return unchanged object for other daos
              });
        })
    }, [skills]);

    const removeSkills = useCallback((skillName: string) => {
        setSkills(prevSkills => {
            return prevSkills.map((skill: SkillType) => {
                if (skill.name === skillName) {
                  return { ...skill, selected: false };
                }
                return skill; // Return unchanged object for other daos
              });
        })
    }, [skills]);

    const addDesiredSkills = useCallback((skillName: string) => {
        setDesiredSkills(prevSkills => {
            return prevSkills.map((skill: SkillType) => {
                if (skill.name === skillName) {
                  return { ...skill, selected: !skill.selected };
                }
                return skill; // Return unchanged object for other daos
              });
        })
    }, [desiredSkills]);

    const removeDesiredSkills = useCallback((skillName: string) => {
        setDesiredSkills(prevSkills => {
            return prevSkills.map((skill: SkillType) => {
                if (skill.name === skillName) {
                  return { ...skill, selected: false };
                }
                return skill; // Return unchanged object for other daos
              });
        })
    }, [desiredSkills]);

    const handleInputChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleInputDesiredChange = (event: any) => {
        setSelectedDesiredOption(event.target.value);
    }

    const handleInputDesiredKeyDown = (event: any) => {
        if (event.key === 'Enter') {
                addDesiredSkills(event.target.value);
                setSelectedDesiredOption('');
        }
    };

    const handleInputKeyDown = (event: any) => {
        if (event.key === 'Enter') {
                addSkills(event.target.value);
                setSelectedOption('');
        }
    };

    const selectedSkillsDiv = useMemo(() => {
        return skills.filter(s => s.selected).map((skill, index) => (
            <div 
                className="flex px-[12px] py-[6px] cursor-pointer gap-2 items-center border border-base-200 rounded-full" 
                style={{color: skill.selected ? "#F2F2F2": "#929292"}} 
                onClick={() => removeSkills(skill.name)}
                key={index}
            >
                <div className="text-[14px] font-500">
                    {skill.name}
                </div>
                {skill.selected ? <CrossIcon />: <PlusIcon />}
            </div>
        ))
    }, [skills])

    const selectedDesiredSkillsDiv = useMemo(() => {
        return desiredSkills.filter(s => s.selected).map((skill, index) => (
            <div 
                className="flex px-[12px] py-[6px] cursor-pointer gap-2 items-center border border-base-200 rounded-full" 
                style={{color: skill.selected ? "#F2F2F2": "#929292"}} 
                onClick={() => removeDesiredSkills(skill.name)}
                key={index}
            >
                <div className="text-[14px] font-500">
                    {skill.name}
                </div>
                {skill.selected ? <CrossIcon />: <PlusIcon />}
            </div>
        ))
    }, [desiredSkills])

    return (
        <div className="">
            <div className="grid mb-[24px] gap-[24px]">
                <div className="grid gap-[12px] w-full">
                    <RegisterTitle title="What are you proficient in?" styles="mb-[16px]" />
                    {skills.length != 0 && (
                        <div>
                            <input
                                className="input input-bordered w-full"
                                list="options"
                                value={selectedOption}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                            />
                            <datalist id="options">
                                {skills.filter(s => !s.selected).map(option => (
                                    <option key={option._id} value={option.name} />
                                ))}
                            </datalist>
                        </div>
                    )}
                    <div className="flex gap-4 flex-wrap">
                        {selectedSkillsDiv}
                    </div>
                </div>
                <div className="grid gap-[12px] w-full">
                    <RegisterTitle title="What would you like to improve in?" styles="mb-[16px]" />
                    {desiredSkills.length != 0 && (
                        <div>
                            <input
                                className="input input-bordered w-full"
                                list="desiredOptions"
                                value={selectedDesiredOption}
                                onChange={handleInputDesiredChange}
                                onKeyDown={handleInputDesiredKeyDown}
                            />
                            <datalist id="desiredOptions">
                                {desiredSkills.filter(s => !s.selected).map(option => (
                                    <option key={option._id} value={option.name} />
                                ))}
                            </datalist>
                        </div>
                    )}
                    <div className="flex gap-4 flex-wrap">
                        {selectedDesiredSkillsDiv}
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