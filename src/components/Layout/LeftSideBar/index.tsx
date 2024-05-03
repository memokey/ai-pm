'use client'

import React, { useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Menu from "./Menu";
import BaseButton from "@/components/Common/Buttons/BaseButton";
import { CogSIcon, PlusIcon, QuestionMarkCircleIcon, VAIcon } from "@/components/Icons";
import MenuItem from "./Menu/MenuItem";
import { useRouter } from "next/navigation";
import TaskMenu from "./TaskMenu";
import { apiCaller } from "@/utils/fetcher";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentTaskId, setHistory, setMessages, setTaskExpand, setTaskMenuItems } from "@/redux/slices/chatSlice";
import { setTaskId, setTasks } from "@/redux/slices/taskSlice";

const LeftSidebar = () => {
    const dispatch = useAppDispatch();
    const { currentTaskId, taskMenuItems, taskId } = useAppSelector((state) => ({
        currentTaskId: state.chat.currentTaskId,
        taskId: state.task.taskId,
        taskMenuItems: state.chat.taskMenuItems,
    }))
    const router = useRouter();

    const createTask = async () => {
        dispatch(setMessages([]));
        dispatch(setHistory([]));
        dispatch(setTasks([]));
        if(taskId != "") {
            dispatch(setTaskId(""));
        }
        router.push(`/chat`);
    }

    useEffect(() => {
        if(taskMenuItems.length == 0) {
            getTasksName()
        }
    }, [])

    const getTasksName = async () => {
        try {
            const {
                data: { tasks }
            } = await apiCaller.post('/api/tasks/getTaskByUser/', {
                is_all: false,
                fields: ['id', "title"]
            });
            if(!!tasks) {
                const taskMenuItems = tasks.map((task: any) => {
                    return {
                        _id: task.id,
                        title: task.title == "" ? "New Task": task.title,
                        link: `/taskboard/${task.id}/chat`,
                        expand: taskId != "" && taskId == task.id,
                        state: false,
                        line: false,
                    }
                })
                dispatch(setTaskMenuItems(taskMenuItems));
            }
        } catch (error) {
            console.log('fetching task error');
        }
    }

    useEffect(() => {
        if(taskId != "" && taskMenuItems.length != 0) {
            dispatch(setTaskExpand({
                _id: taskId,
                expand: true,
            }))
        }
    }, [taskId, taskMenuItems.length])

    return (
        <div className="bg-[#202020] border-[#090909] w-[240px] h-[100vh] z-20 py-[30px] px-[20px] border-r border-r-[1px]">
            <div className="h-[calc(100vh-132px)]">
                <ProfileCard />
                <div className="grid gap-4">
                    <BaseButton 
                        type={true}
                        caption="Create New Task"
                        icon={<PlusIcon />}
                        styles="w-full"
                        onClick={() => createTask()}
                    />
                    <TaskMenu menus={taskMenuItems} title="Spaces" />
                </div>
            </div>
            <div className="grid gap-1">
                <MenuItem 
                    key={0}
                    icon={<CogSIcon />}
                    title="Settings"
                    link={'noLink'}
                    state={false}
                    line={false}
                />
                <MenuItem 
                    key={1}
                    icon={<QuestionMarkCircleIcon />}
                    title="Resources"
                    link={'noLink'}
                    state={false}
                    line={false}
                />
            </div>
        </div>
    );
}

export default LeftSidebar;