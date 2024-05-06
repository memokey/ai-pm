import { Avatar } from "@/components/Common/Avatars";
import { Badge } from "@/components/Common/Badges";
import {
    PrimaryBorderButton,
    PrimaryButton,
} from "@/components/Common/Buttons";
import { ChatInputSm } from "@/components/Common/Inputs";
import { FiveStarRating } from "@/components/Common/Rating";
import {
    AttachIcon,
    AttachedIcon,
    CalendarIcon,
    CircleIcon,
    CloseIcon,
    ColoredSparkleIcon,
    FileShareIcon,
    FlagIcon,
    PlusIcon,
    PlussmIcon,
    ShareIcon,
    SlashIcon,
    SparklesIcon,
    ThreeDotIcon,
    TwoCircleIcon,
} from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import { DEFAULT_COLS_BY_ID, STATUS_ICONS } from "@/data/global";
import { TaskType } from "@/data/types/type";
import { useAppSelector } from "@/redux/hooks";
import {
    setActiveDetail,
    setIsFeedback,
    updateRequest,
} from "@/redux/slices/taskSlice";
import { setTaskerModal } from "@/redux/slices/taskerSlice";
import { apiCaller } from "@/utils/fetcher";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useDownloader from "react-use-downloader";

type RequestDetailBoxType = {
    task: any;
};

const RequestDetailBox = (props: RequestDetailBoxType) => {
    const dispatch = useDispatch();
    const { download } = useDownloader();
    const { requests } = useAppSelector((state) => state.task);
    const [subTasks, setSubTasks] = useState<any[]>([]);
    const [submissionFile, setSubmissionFile] = useState<any>(null);
    const [submissionDescription, setSubmissionDescription] = useState("");

    useEffect(() => {
        if (requests.length != 0 && props.task.id != "") {
            setSubTasks(requests.filter((t) => t.parentId == props.task.id));
        }
    }, [requests.length, props.task.id]);

    const downloadFile = (fileUrl: string, fileName: string) => {
        download(fileUrl, fileName);
    };

    const readFile = async (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0]; // Get the selected file
        if (!!file) {
            setSubmissionFile(file);
        }
    };

    const handleTextAreaChange = (event: any) => {
        setSubmissionDescription(event.target.value);
    };

    const submitResult = async () => {
        if (!submissionFile && submissionDescription != "") {
            alert("Please fill the fields.");
        } else {
            try {
                let fileUrls: any[] = [];
                if (!!submissionFile) {
                    const formData = new FormData();
                    formData.append("file", submissionFile);
                    formData.append(
                        "upload_preset",
                        process.env.NEXT_PUBLIC_PRESET_NAME || ""
                    );
                    formData.append(
                        "cloud_name",
                        process.env.NEXT_PUBLIC_CLOUD_NAME || ""
                    );
                    formData.append("folder", "assets/avatars");

                    const resp = await axios.post(
                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/raw/upload`,
                        formData
                    );
                    fileUrls = [resp.data.url];
                }
                const params = {
                    task_id: props.task.id,
                    description: submissionDescription,
                    upload_paths: fileUrls,
                };
                const res = await apiCaller.post("/api/tasks/submit/", params);
                if (res.data._id) {
                    dispatch(
                        updateRequest({
                            taskId: res.data._id,
                            task: res.data,
                        })
                    );
                }
            } catch (err) {
                console.log("error : ", err);
            }
        }
    };

    return (
        <div className="relative h-full">
            <div className="h-[calc(100vh-64px)] overflow-y-auto">
                <div className="border-b border-base-200 flex justify-between px-5 py-2">
                    <div className="text-[12px] font-600 text-base-300">
                        Description
                    </div>
                    <div className="flex gap-2">
                        <div className="flex gap-3 items-center border-r border-base-200 pr-2">
                            <ShareIcon size={14} />
                            <AttachIcon />
                            <FileShareIcon />
                            <ThreeDotIcon />
                        </div>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => dispatch(setTaskerModal(false))}
                        >
                            <CloseIcon />
                        </div>
                    </div>
                </div>
                <div className="border-b border-base-200">
                    <div className="grid gap-2 px-5 pt-3">
                        <div className="text-[16px] font-500 leading-[20px] text-base-content">
                            {props.task.title}
                        </div>
                    </div>
                    <div className="grid gap-3 py-6 px-5 text-[12px] text-base-300 font-400">
                        <div className="text-[12px] font-600 text-base-300">
                            Properties
                        </div>
                        <div className="grid gap-1 items-center">
                            <div className="flex gap-1 items-center">
                                <div className="w-[75px] flex justify-start">
                                    Status:
                                </div>
                                <div className="flex gap-2 items-center">
                                    {STATUS_ICONS[props.task.properties.status]}
                                    <div className="text-[12px] font-400 text-base-content">
                                        {props.task.properties.status}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="w-[75px] flex justify-start">
                                    Requester:
                                </div>
                                <div className="flex gap-2 items-center">
                                    {!!props.task.properties.requester && (
                                        <div className="flex gap-2 items-center">
                                            <Avatar
                                                img={
                                                    props.task.properties
                                                        .requester.avatar || ""
                                                }
                                                size={16}
                                            />
                                            <div className="text-[12px] font-400 text-base-content py-2">
                                                {
                                                    props.task.properties
                                                        .requester.name
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="w-[75px] flex justify-start">
                                    Reward:
                                </div>
                                <div className="flex gap-2 items-center py-[2px] rounded-[8px] text-[12px] font-400 text-base-content">
                                    {props.task.cost} USDC
                                </div>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="w-[75px] flex justify-start">
                                    Priority:
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div
                                        className="p-[2px] rounded-[2px] w-[16px] h-[16px]"
                                        style={{
                                            backgroundColor:
                                                CONSTANTS.PRIORITY_COLORS[
                                                    props.task.properties
                                                        .priority
                                                ],
                                        }}
                                    >
                                        <FlagIcon size={12} />
                                    </div>
                                    <div className="text-[12px] font-400 text-base-content py-2">
                                        {
                                            CONSTANTS.PRIORITY_TEXTS[
                                                props.task.properties.priority
                                            ]
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="w-[75px] flex justify-start">
                                    Due Date:
                                </div>
                                <div className="flex gap-2 items-center">
                                    <CalendarIcon size={14} />
                                    <div className="text-[12px] font-400 text-base-content">
                                        {props.task.properties.dueDate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 border-b border-base-200 p-3 text-[12px]">
                    <div className="font-600 text-base-300">Description</div>
                    <div className="font-400 text-base-content">
                        {props.task.description}
                    </div>
                </div>
                <div className="grid gap-3 p-3 text-[12px] border-b border-base-200">
                    <div className="font-600 text-base-300">Activity</div>
                    <div className="grid gap-2">
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full p-1 border border-base-200">
                                <PlussmIcon />
                            </div>
                            <div className="font-500 text-base-content">
                                Created
                            </div>
                            <div className="font-400 text-[11px] text-base-300">
                                {props.task.created}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full p-1 border border-base-200">
                                <SlashIcon />
                            </div>
                            <div className="font-500 text-base-content">
                                Last Updated
                            </div>
                            <div className="font-400 text-[11px] text-base-300">
                                {props.task.lastUpdated}
                            </div>
                        </div>
                    </div>
                </div>
                {props.task.properties.status == "In Review" && (
                    <div className="grid gap-3 p-3 text-[12px]">
                        <div className="flex justify-between gap-5">
                            <div className="font-600 text-base-300">
                                Submission
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="font-400 text-base-content grid gap-[10px] items-center">
                                {props.task.properties.submission.description}
                            </div>
                            {props.task.properties.submission.attachments
                                .length != 0 && (
                                <div className="flex gap-2 items-center hover:text-underline cursor-pointer">
                                    <AttachedIcon />
                                    <div
                                        className="text-primary"
                                        onClick={() =>
                                            downloadFile(
                                                props.task.properties.submission
                                                    .attachments[0],
                                                props.task.properties.submission.attachments[0]
                                                    .split("/")
                                                    .pop()
                                            )
                                        }
                                    >
                                        {props.task.properties.submission.attachments[0]
                                            .split("/")
                                            .pop()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {props.task.properties.status == "In Progress" && (
                    <div className="grid gap-3 p-3 text-[12px]">
                        <div className="flex justify-between gap-5">
                            <div className="font-600 text-base-300">
                                Submission
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <textarea
                                placeholder="Bio"
                                className="textarea textarea-bordered textarea-sm w-full max-w"
                                rows={7}
                                value={submissionDescription}
                                onChange={handleTextAreaChange}
                            />
                            <div className="flex justify-between">
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                    onChange={(e) => readFile(e)}
                                />
                                <PrimaryButton
                                    caption="submit"
                                    type={false}
                                    styles="w-[80px]"
                                    onClick={submitResult}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {props.task.properties.status == "Done" && (
                    <div className="grid gap-3 p-3 text-[12px]">
                        <div className="flex justify-between gap-5">
                            <div className="font-600 text-base-300">
                                Feedback
                            </div>
                        </div>
                        {props.task.properties.tasker_feedback &&
                        props.task.properties.tasker_feedback.is_feedback ? (
                            <div className="grid gap-2">
                                <div className="text-[12px] font-400 leading-[20px]">
                                    {
                                        props.task.properties.tasker_feedback
                                            .content
                                    }
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FiveStarRating
                                        rating={
                                            props.task.properties
                                                .tasker_feedback.rate
                                        }
                                        setRating={() => {}}
                                    />
                                    <div className="text-[18px] font-500">
                                        {props.task.properties.tasker_feedback.rate.toFixed(
                                            1
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-base-content">
                                The requester did not give you a feedback yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestDetailBox;
