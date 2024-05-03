"use client"

import React, { useEffect, useMemo, useState } from "react";
import Title from "./Title";
import BalanceBox from "./BalanceBox";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { login, setIsAuthenticated, setIsTasker, setProfile } from "@/redux/slices/authSlice";
import { apiCaller } from "@/utils/fetcher";
import UserMenuItem from "./UserMenus/UserMenuItem";
import { MENUS } from "@/data/global";

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

    const [activeMenu, setActiveMenu] = useState(0);

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

    useEffect(() => {
        const url = location.href;
        const pattern = /\/tasker\//;
        const containsTasker = pattern.test(url);

        setActiveMenu(containsTasker ? 1: 0);
    }, [])

    return (
        <div className="h-[64px] flex justify-between border-b border-base-200 py-[16px] px-6">
            <Title 
                title={props.title}
            />
            <div className="flex gap-16">
                    <div className="flex gap-6 items-center">
                        <UserMenuItem
                            key={0}
                            active={activeMenu == 0}
                            title={MENUS[0].title}
                            onClick={() => {
                                router.push(MENUS[0].link)
                            }} 
                        />
                        {!!isAuthenticated && (
                            <UserMenuItem
                                key={1}
                                title={MENUS[1].title}
                                active={activeMenu == 1}
                                onClick={() => {
                                    if(!profile.registerFlag) {
                                        toOnboarding();
                                    } else {
                                        router.push(MENUS[1].link)
                                    }
                                }}
                            />
                        )}
                    </div>
                <DynamicWalletButton />
            </div>
        </div>
    );
}

export default Header;