import React from "react";
import Avatar from "./Avatar";
import ProfileDetail from "./ProfileDetail";

const ProfileCard = () => {
    return (
        <div className="flex gap-2 mb-[36px]">
            <Avatar />
            <ProfileDetail />
        </div>
    );
}

export default ProfileCard;