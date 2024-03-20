import { DownIcon } from "@/components/Icons";
import React from "react";

const ProfileDetail = () => {
    return (
        <div className="grid gap-1">
            <div className="flex gap-1">
                <div className="font-500">Chatgpt</div>
                <div className="flex items-center cursor-pointer">
                    <DownIcon />
                </div>
            </div>
            <div className="text-base-300 text-[12px] font-[500]">
                andrewchan
            </div>
        </div>
    );
}

export default ProfileDetail;