import React, { useCallback, useEffect, useMemo, useState } from "react";
import RegisterTitle from "../RegisterTitle";
import { PrimaryBorderButton, PrimaryButton } from "@/components/Common/Buttons";
import { useAppDispatch } from "@/redux/hooks";
import { setRegisterStep } from "@/redux/slices/authSlice";
import LinkCard from "@/components/Common/Cards/LinkCard";
import { LeftArrowIcon } from "@/components/Icons";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import Image from "next/image";
import { DaoType } from "@/data/types/type";
import { apiCaller } from "@/utils/fetcher";

const StepThree = () => {
    const dispatch = useAppDispatch();
    const [isDAO, setIsDAO] = useState<Boolean>(false);
    const [daos, setDaos] = useState<DaoType[]>([]);
    const [userInfo, setUserInfo] = useState<any>({});

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
        fetchProfile()
    }, [])

    // Init profile information
    useEffect(() => {
        if(!!userInfo.role) {
            setIsDAO(userInfo.user.is_dao_member);
            if(!!userInfo.user.daos && userInfo.user.daos.length != 0) {
                setDaos(prevDaos => {
                    return prevDaos.map((dao: DaoType) => {
                        const daoIndex = userInfo.user.daos.findIndex((s: string) => s == dao.name);
                        if (daoIndex != -1) {
                          return { ...dao, selected: true };
                        }
                        return dao; // Return unchanged object for other daos
                      });
                })
            }
        }
    }, [userInfo.role])

    const selectedDaos = useMemo(() => {
        return daos.filter(dao => dao.selected).map((dao: DaoType) => dao.name)
    }, [daos]);

    useEffect(() => {
        const fetchDaos = async () => {
            try {
                const response = await apiCaller.get('/api/daos/');
                setDaos(response.data);
            } catch (error) {}
        }
        fetchDaos()
    }, [])
    
    const nextStep = async () => {
        try {
            const data = {
                wallet_address: localStorage.getItem('publickey'),
                wallet_type: localStorage.getItem('type'),
                is_dao_member: isDAO,
                daos: selectedDaos,
                step: "3",
            };
            await apiCaller.post('/auth/register/', data);
        } catch (error) {}
        dispatch(setRegisterStep(4));

    }

    const backStep = () => {
        dispatch(setRegisterStep(2));
    }

    const setDao = useCallback((_id: string) => {
        setDaos(prevDaos => {
            return prevDaos.map((dao: DaoType) => {
              if (dao._id === _id) {
                return { ...dao, selected: !dao.selected };
              }
              return dao; // Return unchanged object for other daos
            });
          });
    }, [setDaos])

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
                            onClick={() => setIsDAO(true)}
                            styles={"!px-[40px] !py-[8px] border border-base-200 " + (isDAO ? "!bg-[#343434]": "!bg-[#191919]")}
                        />
                        <BaseButton 
                            key={1}
                            caption="No"
                            type={false}
                            onClick={() => setIsDAO(false)}
                            styles={"!px-[40px] !py-[8px] border border-base-200 " + (!isDAO ? "!bg-[#343434]": "!bg-[#191919]")}
                        />
                    </div>
                </div>
                {!!isDAO && (
                    <div className="grid gap-[12px]">
                        <RegisterTitle title="Which One?" styles="mb-[8px]" />
                        <div className="flex gap-2">
                            {!!daos && daos.map((dao: DaoType, index: number) => (
                                <LinkCard 
                                    key={index + dao._id}
                                    title={dao.name}
                                    icon={
                                        <Image 
                                            src={dao.img} 
                                            className="rounded-full"
                                            alt={dao.name} 
                                            width={24} 
                                            height={24} 
                                        />
                                    }
                                    onClick={() => setDao(dao._id)}
                                    selected={!!dao.selected && dao.selected ? true: false}
                                />
                            ))}
                        </div>
                    </div>
                )}
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