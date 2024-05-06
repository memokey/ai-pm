import { Avatar } from "@/components/Common/Avatars";
import { Badge } from "@/components/Common/Badges";
import { PrimaryBorderButton } from "@/components/Common/Buttons";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import {
    CalendarIcon,
    DollarIcon,
    FlagIcon,
    RoundDollarIcon,
} from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import { TaskType } from "@/data/types/type";
import { apiCaller } from "@/utils/fetcher";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TaskRequestItem = (props: any) => {
    const [itemHover, setItemHover] = useState(false);
    const router = useRouter();
    const viewDetailTask = () => {
        router.push("/tasker/detailRequest/" + props.id + "/");
    };

    const addToBoard = async () => {
        try {
            await apiCaller.post("/api/tasks/addToBoard/", {
                task_id: props.id,
            });
            router.refresh();
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div
            className={`border border-base-200 rounded-[8px] grid gap-4 p-4 cursor-pointer`}
            style={{
                background: itemHover
                    ? "linear-gradient(90deg, #191919 0%, #252525 48.5%, #191919 100%)"
                    : "transparent",
                boxShadow: itemHover ? "0px 3px 1px 0px #111" : "",
            }}
            onMouseEnter={() => setItemHover(true)}
            onMouseLeave={() => setItemHover(false)}
        >
            <div className="flex gap-4 justify-between">
                <div className="grid gap-2">
                    <h1 className="text-[14px] font-500 leading-[20px] text-base-content">
                        {props.title}
                    </h1>
                    <div className="flex gap-4 items-center">
                        <Badge
                            icon={<CalendarIcon />}
                            data={props.created.slice(0, 10)}
                            styles="!border !border-[#343434] !bg-[#2c2b2b] !text-base-300 !leading-[13px] !text-[12px] !p-1"
                        />
                        <div
                            className="p-1 rounded-[2px]"
                            style={{
                                backgroundColor:
                                    CONSTANTS.PRIORITY_COLORS[
                                        props.properties.priority
                                    ],
                            }}
                        >
                            <FlagIcon size={15} />
                        </div>
                        <Badge
                            icon={<RoundDollarIcon />}
                            data={props.cost}
                            styles="!border !border-[#343434] !text-base-300 !leading-[13px] !text-[12px] !p-1"
                        />
                    </div>
                </div>
                {itemHover && (
                    <div className="flex gap-4 min-w-[214px] items-center">
                        <BaseButton
                            icon={<></>}
                            caption="View task"
                            type={false}
                            onClick={viewDetailTask}
                            styles="!px-4 !py-2 !bg-transparent !border !border-[#343434]"
                        />
                        <PrimaryBorderButton
                            icon={<></>}
                            caption="Add to Board"
                            onClick={addToBoard}
                            type={false}
                        />
                    </div>
                )}
            </div>
            <div className="text-[12px] font-400 leading-[20px] text-base-300">
                {props.description}
            </div>
            {props.properties.assignees.length != 0 && (
                <div className="flex items-center gap-2">
                    <Avatar
                        size={24}
                        img={props.properties.assignees[0].img || ""}
                    />
                    <div className="text-[12p] text-base-300">
                        By {props.properties.assignees[0].name}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskRequestItem;
