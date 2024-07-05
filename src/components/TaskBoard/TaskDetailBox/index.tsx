import { Avatar } from "@/components/Common/Avatars";
import { Badge } from "@/components/Common/Badges";
import Image from "next/image";
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
  CodeIcon,
  DocumentIcon,
} from "@/components/Icons";
import { CONSTANTS } from "@/config/constants";
import { STATUS_ICONS } from "@/data/global";
import { TaskType } from "@/data/types/type";
import { useAppSelector } from "@/redux/hooks";
import {
  setActiveDetail,
  setExecuteDocumentationModal,
  setExecuteCodeModal,
  setIsFeedback,
  updateTask,
} from "@/redux/slices/taskSlice";
import { apiCaller } from "@/utils/fetcher";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDownloader from "react-use-downloader";

type TaskDetailBoxType = {
  task: any;
};

const TaskDetailBox = (props: TaskDetailBoxType) => {
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const dispatch = useDispatch();
  const { download } = useDownloader();
  const { tasks, isFeedback } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (tasks.length != 0 && props.task.id != "") {
      setSubTasks(tasks.filter((t) => t.parentId == props.task.id));
    }
  }, [tasks.length, props.task.id]);

  const downloadFile = (fileUrl: string, fileName: string) => {
    download(fileUrl, fileName);
  };

  const approveTask = async () => {
    const params = {
      task_id: props.task.id,
    };
    try {
      const res = await apiCaller.post("/api/tasks/approveTask/", params);
      if (res.data._id) {
        dispatch(
          updateTask({
            taskId: res.data._id,
            task: res.data,
          })
        );
      }
    } catch (error) {
      console.error("Approvement error");
    }
  };

  const rejectTask = async () => {
    const params = {
      task_id: props.task.id,
    };
    try {
      const res = await apiCaller.post("/api/tasks/rejectTask/", params);
      if (res.data._id) {
        dispatch(
          updateTask({
            taskId: res.data._id,
            task: res.data,
          })
        );
      }
    } catch (error) {
      console.error("Approvement error");
    }
  };

  return (
    <div className="relative h-full">
      <div className="h-[calc(100vh-114px)] overflow-y-auto">
        <div className="border-b border-base-200 flex justify-between px-5 py-2">
          <div className="text-[12px] font-600 text-base-300">Description</div>
          <div className="flex gap-2">
            <div className="flex gap-3 items-center border-r border-base-200 pr-2">
              <ShareIcon size={14} />
              <AttachIcon />
              <FileShareIcon />
              <ThreeDotIcon />
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(setActiveDetail(false))}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className="border-b border-base-200">
          <div className="grid gap-2 px-5 pt-3">
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
            <div className="text-[16px] font-500 leading-[20px] text-base-content">
              {props.task.title}
            </div>
          </div>
          <div className="grid gap-3 py-3 px-5">
            <div className="text-[12px] font-600 text-base-300">Properties</div>
            <div className="grid gap-1 items-center text-[12px]">
              <div className="flex gap-1 items-center">
                <div className="w-[75px] flex justify-start">Status</div>
                <div className="flex gap-2 items-center">
                  {STATUS_ICONS[props.task.properties.status]}
                  <div className="text-[12px] font-400 text-base-content py-2">
                    {props.task.properties.status}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-[75px] flex justify-start">Assignee</div>
                <div className="flex gap-2 items-center">
                  {!!props.task.properties.assignees[0] ? (
                    <div className="flex gap-2 items-center">
                      <Avatar
                        img={props.task.properties.assignees[0].avatar || ""}
                        size={16}
                      />
                      <div className="text-[12px] font-400 text-base-content py-2">
                        {props.task.properties.assignees[0].name}
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={`/tmp/avatars/user.png`}
                      alt="user"
                      width={24}
                      height={24}
                      className="mr-[-10px]"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-[75px] flex justify-start">Cost</div>
                <div className="flex gap-2 items-center py-[2px] px-4 rounded-[8px] bg-[#2A2A2A]">
                  $ {props.task.properties.cost}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-[75px] flex justify-start">Priority</div>
                <div className="flex gap-2 items-center">
                  <div
                    className="p-1 rounded-[2px]"
                    style={{
                      backgroundColor:
                        CONSTANTS.PRIORITY_COLORS[
                          props.task.properties.priority
                        ],
                    }}
                  >
                    <FlagIcon size={12} />
                  </div>
                  <div className="text-[12px] font-400 text-base-content py-1">
                    {CONSTANTS.PRIORITY_TEXTS[props.task.properties.priority]}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-[75px] flex justify-start">Due Date</div>
                <div className="flex gap-2 items-center">
                  <CalendarIcon size={14} />
                  <div className="text-[12px] font-400 text-base-content py-2">
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
        <div className="grid gap-3 border-b border-base-200 p-3 text-[12px]">
          <div className="font-600 text-base-300">Task Progress</div>
          <div className="font-400 text-base-content flex gap-2 items-center">
            <progress
              className="progress progress-success w-56"
              value={props.task.taskProgress * 100}
              max="100"
            ></progress>
            <span>{props.task.taskProgress * 100}%</span>
          </div>
        </div>
        {props.task.properties.status == "In Review" && (
          <div className="grid gap-3 border-b border-base-200 p-3 text-[12px]">
            <div className="font-600 text-base-300">Submission</div>
            <div className="font-400 text-base-content grid gap-[10px] items-center">
              {props.task.properties.assignees.length != 0 && (
                <div className="flex gap-1">
                  <Avatar
                    img={props.task.properties.assignees[0].avatar || ""}
                    size={16}
                  />
                  <div className="text-[12px] font-400 text-base-300">
                    {props.task.properties.assignees[0].name}
                  </div>
                  <div className="text-[11px] font-400 text-[#626262]">
                    {props.task.properties.submission.date}
                  </div>
                </div>
              )}
              <div className="text-[12px] font-400 leading-[20px] text-base-300">
                {props.task.properties.submission.description}
              </div>
              {props.task.properties.submission.attachments.length != 0 && (
                <div className="flex gap-2 items-center hover:text-underline cursor-pointer">
                  <AttachedIcon />
                  <div
                    className="text-primary"
                    onClick={() =>
                      downloadFile(
                        props.task.properties.submission.attachments[0],
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
              <div className="flex gap-[10px]">
                <PrimaryButton
                  caption="Approve Task"
                  styles="!h-[30px]"
                  type={false}
                  onClick={approveTask}
                />
                <PrimaryBorderButton
                  caption="Reject"
                  styles="!h-[30px]"
                  onClick={rejectTask}
                  type={false}
                />
              </div>
            </div>
          </div>
        )}
        <div className="grid gap-3 border-b border-base-200 p-3 text-[12px]">
          <div className="flex justify-between gap-5">
            <div className="font-600 text-base-300">Subtasks</div>
            {subTasks.length == 0 && (
              <>
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => dispatch(setExecuteDocumentationModal(true))}
                >
                  <DocumentIcon />
                  <div className="font-400 text-base-300">
                    Generate Documentation
                  </div>
                </div>
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => dispatch(setExecuteCodeModal(true))}
                >
                  <CodeIcon />
                  <div className="font-400 text-base-300">Generate Code</div>
                </div>
              </>
            )}
          </div>
          <div className="font-400 text-base-content flex gap-2 items-center">
            {subTasks.length != 0 && (
              <div className="rounded-[8px] border border-base-200 overflow-hidden w-full">
                {subTasks.map((subtask, index) => (
                  <div
                    className="px-3 py-2 flex items-center gap-6 justify-between border-b border-base-200"
                    key={index}
                  >
                    <div className="flex gap-2 items-center">
                      {STATUS_ICONS[subtask.properties.status]}
                      <div className="font-400 text-base-content">
                        {subtask.title}
                      </div>
                    </div>
                    {subtask.properties.assignees.length != 0 && (
                      <div>
                        <Avatar
                          img={subtask.properties.assignees[0].avatar || ""}
                          size={16}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-3 p-3 text-[12px]">
          <div className="font-600 text-base-300">Activity</div>
          <div className="grid gap-2">
            <div className="flex gap-2 items-center">
              <div className="rounded-full p-1 border border-base-200">
                <PlussmIcon />
              </div>
              <div className="font-500 text-base-content">Created</div>
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
              <div className="font-500 text-base-content">Last Updated</div>
              <div className="font-400 text-[11px] text-base-300">
                {props.task.lastUpdated}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex gap-2 items-center">
              {!!props.task.properties.agents[0] && (
                <div>
                  <Avatar
                    img={props.task.properties.agents[0].avatar}
                    size={20}
                  />
                  <div className="font-500 text-base-content">
                    {props.task.properties.agents[0].name}
                  </div>
                  <div className="font-400 text-[11px] text-base-300">
                    {props.task.lastUpdated}
                  </div>
                </div>
              )}
            </div>
            {props.task.properties.status == "Done" ? (
              <div className="">
                {props.task.properties.tasker_feedback &&
                props.task.properties.tasker_feedback.is_feedback ? (
                  <div className="grid gap-2">
                    <div className="text-[12px] font-400 leading-[20px]">
                      {props.task.properties.tasker_feedback.content}
                    </div>
                    <div className="flex gap-2 items-center">
                      <FiveStarRating
                        rating={props.task.properties.tasker_feedback.rate}
                        setRating={() => {}}
                      />
                      <div className="text-[18px] font-500">
                        {props.task.properties.tasker_feedback.rate.toFixed(1)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <PrimaryBorderButton
                      caption="Leave a feedback"
                      type={false}
                      styles="h-[25px]"
                      onClick={() => {
                        dispatch(setIsFeedback(true));
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[12px] text-base-300 font-400">
                I can definitely write a document about Familiarizing yourself
                and its features for creating detailed and functional
                assessments. I will get working on that now! just wanted to let
                you know that I have completed the task you assigned me. Hope it
                helps!
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bg-[#191919] bottom-0 border-t border-base-200 items-end left-0 right-0 p-3 flex gap-2">
        <Avatar
          img={
            (props.task.properties.assignees.length != 0 &&
              props.task.properties.assignees[0].avatar) ||
            "/images/avatars/default.png"
          }
          size={23}
        />
        <ChatInputSm
          sendMessage={undefined}
          message={""}
          setMessage={function (index: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};

export default TaskDetailBox;
