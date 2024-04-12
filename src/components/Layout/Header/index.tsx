"use client"

import React, { useEffect, useMemo } from "react";
import Title from "./Title";
import BalanceBox from "./BalanceBox";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { login, setRegisterStep } from "@/redux/slices/authSlice";
import { apiCaller } from "@/utils/fetcher";

const DynamicWalletButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), {
    ssr: false
});
  
export type HeaderType = {
    title: string;
}

const Header = (props: HeaderType) => {
    const wallet = useWallet()
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { logged } = useAppSelector(state => state.auth);

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
            data: { exist, user },
        } = await apiCaller.post('/auth/userExist/', {
            publicKey: address,
            walletType: type,
        })

        let url : any;
        if (!exist || user.registerFlag == false) {
            if(!!user && !!user.step) {
                await dispatch(setRegisterStep(parseInt(user.step) + 1));
            }
            router.push('/auth/register');
            return;
        }

        if(user.isAuthenticated) {
            console.log(user);
            return;
        }

        await dispatch(login({ 
            publicKey: address, 
            walletType: type, 
            provider,
            next: () => router.push(url),
        }))
    }

    return (
        <div className="h-[56px] flex justify-between border-b border-base-200 py-[16px] px-6">
            <Title 
                title={props.title}
            />
            <BalanceBox 
                balance={9669}
            />
            <DynamicWalletButton />
        </div>
    );
}

export default Header;