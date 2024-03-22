import { Avatar } from "@/components/Common/Avatars";
import { EditIcon } from "@/components/Icons";
import React from "react";

export type AgentListItemType = {
    img: string;
    name: string;
    onEdit?: any;
}

const AgentListItem = (props: AgentListItemType) => {
    return (
        <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
                <Avatar 
                    img={props.img}
                    size={20}
                />
                <h2 className="text-[14px] font-500 text-base-300">{props.name}</h2>
            </div>
            <div 
                className="cursor-pointer"
                onClick={props.onEdit}
            >
                <EditIcon />
            </div>
        </div>
    );
}

export default AgentListItem;