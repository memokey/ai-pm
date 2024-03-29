import Title from "@/components/Layout/Header/Title";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

const TaskBoardHeader = () => {
    return (
        <div className="h-[56px] flex justify-between border-b border-base-200 py-[18px] px-6">
            <Title
                title="Board"
            />
            <WalletMultiButton />
        </div>
    );
}

export default TaskBoardHeader;