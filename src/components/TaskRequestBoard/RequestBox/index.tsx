import { Avatar } from "@/components/Common/Avatars";
import { Badge } from "@/components/Common/Badges";
import { CalendarIcon, FlagIcon, MessageIcon } from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import { TaskType } from "@/data/types/type";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export type RequestBoxType = {
    task: TaskType;
    deleteTask: any;
    updateTask: any;
}

const RequestBox = (props: RequestBoxType) => {

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
      } = useSortable({
        id: props.task.id,
        data: {
          type: "Task",
          task: props.task,
        },
        disabled: false,
      });
    
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };


    if (isDragging) {
        return (
          <div
            ref={setNodeRef}
            style={style}
            className="
            opacity-30
          bg-[#2A2A2A] p-2.5 h-[80px] min-h-[80px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
          "
          />
        );
    }
    
    return (
        <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
            className="flex justify-between
        bg-[#2A2A2A] p-2 min-h-[80px] h-[80px] border border-[#343434] items-end flex text-left rounded-[8px] shadow-sm shadow-[#141414] cursor-grab relative mb-2"
        >
            <div className="grid gap-4">
                <div className="grid gap-1">
                    <div className="flex gap-1">
                        <div className="text-[13px] font-500">{props.task.title.length > 30 ? props.task.title.slice(0, 30) + "...": props.task.title}</div>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Badge 
                        key={1}
                        icon={<CalendarIcon />}
                        data={props.task.created}
                        styles="!p-[4px] bg-[#3c3c3c] !text-[10px] !leading-[10px] !font-500 h-fit"
                    />
                    <Badge 
                        key={2}
                        icon={<MessageIcon />}
                        data={props.task.properties.messages}
                        styles="!p-[4px] bg-[#3c3c3c] !text-[10px] !leading-[10px] !font-500 h-fit"
                    />
                    <div className={`p-1 rounded-[2px] h-fit`} style={{backgroundColor: CONSTANTS.PRIORITY_COLORS[props.task.properties.priority]}}>
                        <FlagIcon size={12} />
                    </div>
                </div>
            </div>
            <div className="flex h-fit">
                {props.task.properties.assignees.map((assignee, index) => (
                    <div key={index} className="w-[26px] ml-[-13px]">
                        <Avatar img={assignee.img || ""} size={26}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RequestBox;