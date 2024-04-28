import React, { useState } from "react";
import { Badge } from "@/components/Common/Badges";
import { CalendarIcon, FlagIcon, MessageIcon, ShareIcon, SparklesIcon, TwoCircleIcon } from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import { TaskType } from "@/data/types/type";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { setActiveDetail, setTaskId } from "@/redux/slices/taskSlice";
import { useDispatch } from "react-redux";

export type TaskCardType = {
    task: any;
    deleteTask: any;
    updateTask: any;
}

const TaskCard = (props: TaskCardType) => {
    const dispatch = useDispatch();
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
          bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
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
            className="grid gap-4 h-[100px] min-h-[100px] rounded-[8px] py-[6px] px-2 bg-[#2A2A2A] mb-4 cursor-grab shadow-b shadow-[#141414] shadow-sm"
            onClick={() => {
                dispatch(setActiveDetail(true));
                dispatch(setTaskId(props.task.id));
            }}
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <div className="grid gap-1">
                <div className="flex gap-1">
                    <Badge 
                        key={0}
                        icon={<SparklesIcon size={12} />}
                        data={props.task.properties.agents.length}
                        styles="!p-[4px] !text-[10px] !leading-[10px] !font-500 h-fit"
                    />
                    <Badge 
                        key={1}
                        icon={<TwoCircleIcon size={12} />}
                        data={props.task.properties.humans.length}
                        styles="!p-[4px] !text-[10px] !leading-[10px] !font-500 h-fit"
                    />
                </div>
                <div className="flex justify-between gap-1">
                    <div className="text-[13px] font-500">{props.task.title.length > 30 ? props.task.title.slice(0, 30) + "...": props.task.title}</div>
                    <div className="flex h-fit">
                        {props.task.properties.assignees.map((assignee: any, index: number) => (
                            <div key={index} className="w-[26px] ml-[-13px]">
                                <Image src={assignee.img || ""} alt="Avatar" width={26} height={26} className="rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-1 items-center">
                <Badge 
                    key={0}
                    icon={<ShareIcon />}
                    data={props.task.properties.shares}
                    styles="!p-[4px] bg-[#3c3c3c] !text-[10px] !leading-[10px] !font-500 h-fit"
                />
                <Badge 
                    key={1}
                    icon={<CalendarIcon />}
                    data={"Yesterday"}
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
    );
}

export default TaskCard;