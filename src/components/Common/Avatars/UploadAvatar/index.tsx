import { EditIcon, LargeAvatarIcon } from "@/components/Icons";
import React from "react";

const UploadAvatar = () => {
    return (
        <div className="w-[72px] h-[72px] bg-[#343434] rounded-[8px] relative">
            <div className="absolute left-[21px] top-[21px] right-[21px]">
                <LargeAvatarIcon />
            </div>
            <div className="absolute right-0 bottom-0 w-[26px] h-[26px] bg-base-content rounded-full text-base-100 flex items-center justify-center cursor-pointer">
                <EditIcon />
            </div>
        </div>
    );
}

export default UploadAvatar;