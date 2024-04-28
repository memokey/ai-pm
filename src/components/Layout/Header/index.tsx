"use client"

import React, { useEffect, useMemo } from "react";
import Title from "./Title";
import BalanceBox from "./BalanceBox";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { login, setIsAuthenticated, setIsTasker, setProfile, setRegisterStep } from "@/redux/slices/authSlice";
import { apiCaller } from "@/utils/fetcher";
import { PrimaryButton } from "@/components/Common/Buttons";

const DynamicWalletButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), {
    ssr: false
});
  
export type HeaderType = {
    title: string;
}

const Header = (props: HeaderType) => {
    const wallet = useWallet();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { logged, profile, isAuthenticated, isTasker } = useAppSelector(state => state.auth);

    const connected = useMemo(() => {
        return wallet.connected
    }, [wallet])

    useEffect(() => {
        if (connected && !logged && !!wallet.publicKey) {
            let publicKey = wallet.publicKey.toBase58();
            let type = 'solana';

            loginUser(publicKey, type, wallet);
        }
    }, [connected])

    const loginUser = async (address: string, type: string, provider: any) => {
        localStorage.setItem('publickey', address)
        localStorage.setItem('type', type)

        const {
            data: { exist, isAuthenticated, profile },
        } = await apiCaller.post('/auth/userExist/', {
            public_key: address,
            wallet_type: type,
        })

        if(exist && isAuthenticated) {
            dispatch(setIsAuthenticated(true));
            dispatch(setProfile(profile));
            return;
        }

        await dispatch(login({
            publicKey: address,
            walletType: type,
            provider,
            next: () => {},
        }))
    }

    const toOnboarding = () => {
        router.push(`/onboarding/`);
    }

    const toggleTasker = () => {
        dispatch(setIsTasker(!isTasker));
        if(!isTasker) {
            router.push('/tasker/taskRequests');
        } else {
            router.push('/chat');
        }
    }

    return (
        <div className="h-[56px] flex justify-between border-b border-base-200 py-[16px] px-6">
            <Title 
                title={props.title}
            />
            <div className="flex gap-2">
                {!!isAuthenticated && profile.registerFlag ? (
                    <div className="form-control flex items-center pt-1 gap-2 ">
                        <input type="checkbox" className="toggle toggle-primary" checked={isTasker} onClick={toggleTasker} />
                    </div>
                ): (
                    <PrimaryButton 
                        caption={"Create a tasker's profile"}
                        type={false}
                        icon={<></>}
                        styles="!py-[16px]"
                        onClick={toOnboarding}
                    />
                )}
                <DynamicWalletButton />
            </div>
        </div>
    );
}

export default Header;