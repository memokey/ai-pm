"use client"

import React, { useEffect, useMemo } from "react";
import Title from "./Title";
import BalanceBox from "./BalanceBox";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/authSlice";
import { loginProps } from "@/data/types/type";

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
        let data: loginProps = {
            publicKey: address,
            walletType: type,
            provider,
        }

        await dispatch(login({ 
            publicKey: address, 
            walletType: type, 
            provider 
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