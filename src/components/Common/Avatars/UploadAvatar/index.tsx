'use client'

import Image from "next/image";
import React, { useRef, useState } from "react";
import { v2 as cloudinary } from 'cloudinary';
import { EditIcon, LargeAvatarIcon } from "@/components/Icons";
import axios from "axios";

export type UploadAvatarType = {
    imageUrl: string;
    setImageUrl: any;
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_API_SECRET,
})

const UploadAvatar = (props: UploadAvatarType) => {
    const avatarImage = useRef();

    const edit = () => {
        let file_dlg = document.getElementById('file_dlg');
        (file_dlg as any).dispatchEvent(new MouseEvent('click'))
    }

    const readFile = async (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        const file = e.target.files[0]; // Get the selected file

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_PRESET_NAME || "");
        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME || "");
        formData.append('folder', 'assets/avatars');

        try {
            const resp = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                formData
            )
            props.setImageUrl(resp.data.url);
        } catch (err) {
            console.log('error : ', err)
        }

        if (file) {
            const reader = new FileReader(); // Create a new FileReader object
            reader.onload = function (e) {
                const imagePreview = (avatarImage as any).current; // Set the src attribute of the <img> tag to the data URL
                imagePreview.src = e.target?.result;
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    }

    return (
        <div className="w-[72px] h-[72px] bg-[#343434] rounded-[8px] relative overflow-hidden">
                {!!props.imageUrl && props.imageUrl != "" ? (
                    <div className="">
                        <img src={props.imageUrl} width={72} height={72} alt="avatar" />
                    </div>
                ) : (
                    <div className="absolute left-[21px] top-[21px] right-[21px]">
                        <LargeAvatarIcon />
                    </div>
                )}
            <div 
                className="absolute right-0 bottom-0 w-[26px] h-[26px] bg-base-content rounded-full text-base-100 flex items-center justify-center cursor-pointer"
                onClick={edit}
            >
                <EditIcon />
            </div>
            <input
                type="file"
                className="hidden"
                id="file_dlg"
                name="fileList"
                ref={avatarImage}
                onChange={(e) => readFile(e)}
            />
        </div>
    );
}

export default UploadAvatar;