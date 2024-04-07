'use client'

import React, { ReactNode, useState } from "react";

type RegisterBoxType = {
    icon: ReactNode;
    title: String;
    description: String;
    active: Boolean;
    onClick: any;
}

const RegisterBox = (props: RegisterBoxType) => {
    const [hover, setHover] = useState(false);
    return (
        <div 
            className="py-[30px] px-[20px] grid gap-4 border border-base-200 rounded-[8px] w-[300px] cursor-pointer" 
            style={{background: props.active || hover ? 'linear-gradient(90deg, #191919 0%, #252525 48.5%, #191919 100%)': '' }}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={props.onClick}
        >
            {props.icon}
            <div className="grid gap-2">
                <div className="text-[24px] font-300 text-base-content">{props.title}</div>
                <div className="text-[12px] font-400 leading-[20px] text-base-300">{props.description}</div>
            </div>
        </div>
    );
}

export default RegisterBox;