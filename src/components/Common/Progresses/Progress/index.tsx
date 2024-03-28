import Image from "next/image";
import React from "react";

const ProgressBar = () => {
    return (
        <div className="grid gap-4">
            <div className="flex gap-2">
                <Image 
                    src={'/images/avatars/default.png'} 
                    width={24} 
                    height={24} 
                    alt="Avatar" 
                />
                <div className="relative flex items-end">
                    <Image 
                        src={'/images/utils/progressbar.png'} 
                        width={192} 
                        height={19} 
                        alt="ProgressBar" 
                    />
                    <Image 
                        src={'/images/utils/line.png'} 
                        className="absolute left-[144px]" 
                        width={12}
                        height={37} 
                        alt="Line" 
                    />
                </div>
                <Image 
                    src={'/images/avatars/bot.png'} 
                    width={24} 
                    height={24} 
                    alt="Avatar" 
                />
            </div>
            <div className="text-center w-full text-[14px] font-400 text-base-300">
                75% AI Centric
            </div>
        </div>
    );
}

export default ProgressBar;