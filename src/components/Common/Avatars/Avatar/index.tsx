import React from "react";
import Image from "next/image";
import { CONSTANTS } from "@/config/constants";

export type AvatarType = {
    img: string;
    size: number;
    state?: number;
    styles?: string;
}

const Avatar = (props: AvatarType) => {
    return (
        <div className="relative">
            <Image src={props.img} className={`rounded-[8px] ${props.styles ? props.styles: ""}`} alt="Avatar" width={props.size} height={props.size} />
            {!!props.state || props.state == 0 && (
                <div className="absolute right-0 bottom-0 w-[20px] h-[20px] rounded-full border-[2px] border-[#141414]" style={{backgroundColor: CONSTANTS.USER_STATES[props.state]}}></div>
            )}
        </div>
    );
}

export default Avatar;