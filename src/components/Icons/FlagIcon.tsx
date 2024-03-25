import { IconType } from "@/data/types/type";
import React from "react";

export const FlagIcon = (props: IconType) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 16} height={props.size || 16} viewBox="0 0 12 12" fill="none">
            <path d="M1 1.5H10.5692C10.7073 1.5 10.8193 1.61193 10.8193 1.75C10.8193 1.7935 10.8079 1.83626 10.7863 1.87403L9 5L10.7863 8.12595C10.8548 8.24585 10.8131 8.39855 10.6933 8.46705C10.6555 8.48865 10.6127 8.5 10.5692 8.5H2V11H1V1.5Z" fill="#F5F5F5"/>
        </svg>
    );
}