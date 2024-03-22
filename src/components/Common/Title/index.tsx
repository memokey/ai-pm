import { PlusIcon } from "@/components/Icons";
import React from "react";

type HeaderTitleType = {
    title: string;
    onAdd?: any;
}

const HeaderTitle = (props:HeaderTitleType) => {
    return (
        <div className="flex justify-between items-center">
            <h2 className="font-600 text-[14px] text-[#737373]">{props.title}</h2>
            <div 
                className="cursor-pointer"
                onClick={props.onAdd}
            >
                <PlusIcon />
            </div>
        </div>
    );
}

export default HeaderTitle;