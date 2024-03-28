import { IconType } from "@/data/types/type";
import React from "react";

export const RightArrowIcon = (props: IconType) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 16} height={props.size || 16} viewBox="0 0 16 16" fill="none">
            <path d="M9 3L14 8M14 8L9 13M14 8H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}