import React from "react";
import Image from "next/image";

export type AvatarType = {
    img: string;
    size: number;
}

const Avatar = (props: AvatarType) => {
    return (
        <Image src={props.img} className="rounded-full" alt="Avatar" width={props.size} height={props.size} />
    );
}

export default Avatar;