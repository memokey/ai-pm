import Image from "next/image";
import React from "react";

export type BalanceBoxType = {
    balance: number;
}

const BalanceBox = (props: BalanceBoxType) => {
    return (
        <div className="flex items-center cursor-pointer">
            <div className="rounded-full p-1 bg-[#191919] border border-base-200 z-30 h-[20px]">
                <Image src="/images/utils/coin.png" alt="coin" width={10} height={10} />
            </div>
            <div className="text-[12px] ml-[-12px] font-500 text-base-content py-[2px] z-20 pl-[16px] pr-[8px] bg-base-200 rounded-[28px] h-[]">
                {props.balance}
            </div>
        </div>
    );
}

export default BalanceBox;