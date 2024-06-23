"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  setHistory,
  setLoading,
  setTextMessages,
} from "@/redux/slices/chatSlice";
import { setExecuteModal } from "@/redux/slices/taskSlice";
import { updateTask } from "@/redux/slices/taskSlice";
import { ChatInputAI } from "../Inputs";
import { useAppSelector } from "@/redux/hooks";
import { TaskType } from "@/data/types/type";
import { apiCaller } from "@/utils/fetcher";
import { PrimaryBorderButton, PrimaryButton } from "../Buttons";
import { TextMessageType } from "@/components/ChatContainer/Chatbox/UserMessage";
import {
  DownArrowIcon,
  PlussmIcon,
  RightIcon,
  SlashIcon,
  EditIcon,
  SaveIcon,
} from "@/components/Icons";
import subTaskPrompt from "@/data/Prompts/subTaskPrompt";

export type ModalType = {
  title: string;
  task: TaskType;
  tasks: Array<TaskType>;
};

const TaskerInterfaceModal = (props: ModalType) => {
  const { auth, history, loading, textmessages } = useAppSelector((state) => ({
    auth: state.auth,
    history: state.chat.history,
    loading: state.chat.loading,
    textmessages: state.chat.textmessages,
  }));

  var indexToExclude = 0;
  var tasks = props.tasks.filter((_, index) => index !== indexToExclude);
  const dispatch = useDispatch();
  const [isExpand, setIsExpand] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAIResult] = useState<string>("");

  useEffect(() => {
    const fetchTask = async () => {
      console.log(props.task.id);
      try {
        dispatch(setLoading(true));
        const response = await apiCaller.get(`/api/tasks/${props.task.id}/`);
        let messages = [];
        if (response.data.chat.length == 0) {
          const firstPrompt =
            "The task title is " +
            props.tasks[0].title +
            ". The subtask description is " +
            props.task.description +
            " Let's make documentation to do it";
          dispatch(setHistory([]));
          const firstMessage: TextMessageType[] = [
            {
              role: "user",
              content: firstPrompt,
            },
          ];
          try {
            dispatch(setLoading(true));
            const response = await getOpenAIResponse(firstMessage);
            dispatch(setLoading(false));

            setPrompt("");
            setAIResult(response.content);
            console.log("textmessage", textmessages);

            const newMessages: TextMessageType[] = [
              ...firstMessage,
              { role: response.role, content: response.content },
            ];
            dispatch(setTextMessages(newMessages));
            const chatSaveResponse: any = await apiCaller.post(
              `/api/tasks/subtask/chat/${props.task.id}/`,
              {
                message: firstPrompt,
                response: response.content,
                history: [
                  {
                    role: "system",
                    content: subTaskPrompt,
                  },
                  ...newMessages,
                ],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch(setHistory(chatSaveResponse.task.chat[0].history));
            console.log("chatSaveResponse", chatSaveResponse);
          } catch (error) {
            console.error("Error getting response from OpenAI API:", error);
          }
        } else {
          for (const chat of response.data.chat) {
            messages.push({
              role: "user",
              content: chat.message,
            });
            messages.push({
              role: "assistant",
              content: chat.response,
            });

            dispatch(setHistory(chat.history));
          }
          dispatch(setTextMessages(messages));
          setAIResult(messages[messages.length - 1]["content"]);
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error("Fetching task issue.");
      }
    };

    fetchTask();
  }, []);

  const closeDlg = (e: any) => {
    if (
      !!e.target.className.includes &&
      e.target.className.includes("room_setting_dlg")
    ) {
      dispatch(setExecuteModal(false));
    }
  };

  const sendMessage = async () => {
    console.log("textmessages", textmessages);
    if (prompt.trim().length === 0) {
      return;
    }
    const tmpMessages: TextMessageType[] = JSON.parse(
      JSON.stringify([...textmessages, { content: prompt, role: "user" }])
    );
    try {
      dispatch(setLoading(true));
      const response = await getOpenAIResponse(tmpMessages);
      dispatch(setLoading(false));

      setPrompt("");
      setAIResult(response.content);

      const newMessages: TextMessageType[] = [
        ...tmpMessages,
        {
          role: response.role,
          content: response.content,
        },
      ];
      const chatSaveResponse = await apiCaller.post(
        `/api/tasks/subtask/chat/${props.task.id}/`,
        {
          message: prompt,
          response: response.content,
          history: [
            ...history,
            { role: "user", content: prompt },
            { role: response.role, content: response.content },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("chatSaveResponse", chatSaveResponse);
      dispatch(setTextMessages(newMessages));
    } catch (error) {
      console.error("Error getting response from OpenAI API:", error);
    }
  };

  const getOpenAIResponse = async (messages: any) => {
    // Make API request to OpenAI
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    return data.output;
  };

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const approveTask = async () => {
    const params = {
      task_id: props.task.id,
      tasker: "OpenAI",
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
      dispatch(setExecuteModal(false));
    } catch (error) {
      console.error("Approvement error");
    }
  };

  return (
    <div
      className="fixed top-[0px] left-[0px] right-[0px] bottom-[0px] backdrop-blur-[20px] z-[1002] justify-center items-center room_setting_dlg"
      onClick={(e) => closeDlg(e)}
    >
      <div className="w-[70vw] grid grid-cols-10 h-[92vh] mt-[5vh] pt-[5vh] rounded-[6px] top-10 bg-[#191919] shadow-[#141414] shadow-lg border border-[#212121] mx-auto flex justify-between">
        <div className="col-span-2 bg-[#202020] p-[2vh] rounded-[4px] border-r-[1px] border-r-[#343434]">
          <div className="mb-2 text-left text-[10px] text-[#474747]">Task</div>
          <div>
            <button
              className="text-left text-base font-semibold flex items-center w-full focus:outline-none bg-[#333] rounded-[3px] p-[4px]"
              onClick={handleExpand}
            >
              <div className="pr-[4px]">
                {isExpand ? <DownArrowIcon /> : <RightIcon />}
              </div>
              <span className="text-[#979797] text-xs">
                {props.tasks[0].title}
              </span>
            </button>
          </div>
          {isExpand && (
            <ul className="pl-[2vh] pt-[1vh]">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center pl-2 mb-0 pb-2 border-l-2  ${
                    task.id == props.task.id
                      ? "border-[#888888]"
                      : "border-[#474747]"
                  }`}
                >
                  {task.id == props.task.id ? (
                    <span className="w-[11px] h-[11px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                      >
                        <circle cx="7.5" cy="8" r="5.5" fill="#069F5D" />
                        <circle
                          cx="7.5"
                          cy="8"
                          r="6.5"
                          stroke="#069F5D"
                          stroke-opacity="0.4"
                          stroke-width="2"
                        />
                        <path
                          d="M7.05776 9.19483L9.82413 6.42847L10.2497 6.85406L7.05776 10.046L5.14258 8.13086L5.56818 7.70526L7.05776 9.19483Z"
                          fill="#343434"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="w-[11px] h-[11px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                      >
                        <circle cx="7.5" cy="8" r="5.5" fill="#069F5D" />
                        <circle
                          cx="7.5"
                          cy="8"
                          r="6.5"
                          stroke="#069F5D"
                          stroke-opacity="0.1"
                          stroke-width="2"
                        />
                        <path
                          d="M7.05776 9.19483L9.82413 6.42847L10.2497 6.85406L7.05776 10.046L5.14258 8.13086L5.56818 7.70526L7.05776 9.19483Z"
                          fill="#343434"
                        />
                      </svg>
                    </span>
                  )}
                  <span
                    className={`ml-4 text-xs ${
                      task.id == props.task.id
                        ? "text-[#f5f5f5]"
                        : "text-[#bfbfbf]"
                    }`}
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-span-5 p-[2vh] flex gap-[16px] flex-col items-end">
          <div className="flex flex-col items-start self-stretch rounded-lg bg-[#2a2a2a]">
            <div className="flex py-2 px-3 items-center justify-between gap-2 self-stretch border-b-[1px] border-b-[#343434]">
              <div className="text-[#F5F5F5] text-xs">Results</div>
              <div className="w-[14px] h-[14px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.1875 2.1875V4.8125M2.1875 2.1875H4.8125M2.1875 2.1875L5.25 5.25M2.1875 11.8125V9.1875M2.1875 11.8125H4.8125M2.1875 11.8125L5.25 8.75M11.8125 2.1875H9.1875M11.8125 2.1875V4.8125M11.8125 2.1875L8.75 5.25M11.8125 11.8125H9.1875M11.8125 11.8125V9.1875M11.8125 11.8125L8.75 8.75"
                    stroke="#BFBFBF"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center p-2 gap-2 self-stretch">
              <div className="w-4 h-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 14C9.33 13.9999 10.6223 13.5581 11.674 12.744C12.7257 11.9299 13.4773 10.7895 13.8107 9.502M8 14C6.67 13.9999 5.37769 13.5581 4.32598 12.744C3.27427 11.9299 2.52272 10.7895 2.18934 9.502M8 14C9.65667 14 11 11.3133 11 8C11 4.68667 9.65667 2 8 2M8 14C6.34334 14 5 11.3133 5 8C5 4.68667 6.34334 2 8 2M13.8107 9.502C13.934 9.022 14 8.51867 14 8C14.0016 6.96807 13.7359 5.95333 13.2287 5.05467M13.8107 9.502C12.0328 10.4876 10.0328 11.0032 8 11C5.892 11 3.91134 10.4567 2.18934 9.502M2.18934 9.502C2.06317 9.01132 1.99955 8.50665 2 8C2 6.93 2.28 5.92467 2.77134 5.05467M8 2C9.06416 1.99956 10.1093 2.28224 11.0281 2.81904C11.947 3.35585 12.7065 4.12744 13.2287 5.05467M8 2C6.93584 1.99956 5.89072 2.28224 4.97187 2.81904C4.05303 3.35585 3.29354 4.12744 2.77134 5.05467M13.2287 5.05467C11.7771 6.31195 9.92036 7.00276 8 7C6.00134 7 4.17334 6.26667 2.77134 5.05467"
                    stroke="#3C75FF"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="text-[#3775FF] text-xs font-normal leading-5">
                localhost:1200:400
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch rounded-lg bg-[#2a2a2a]">
            <div className="flex py-2 px-3 items-center justify-between gap-2 self-stretch border-b-[1px] border-b-[#343434]">
              <div className="text-[#F5F5F5] text-xs">Description</div>
              <div className="w-[14px] h-[14px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.1875 2.1875V4.8125M2.1875 2.1875H4.8125M2.1875 2.1875L5.25 5.25M2.1875 11.8125V9.1875M2.1875 11.8125H4.8125M2.1875 11.8125L5.25 8.75M11.8125 2.1875H9.1875M11.8125 2.1875V4.8125M11.8125 2.1875L8.75 5.25M11.8125 11.8125H9.1875M11.8125 11.8125V9.1875M11.8125 11.8125L8.75 8.75"
                    stroke="#BFBFBF"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center p-2 gap-2 self-stretch">
              <div className="text-[#bfbfbf] text-xs font-normal non-italic leading-5">
                {props.task.description}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch rounded-lg bg-[#2a2a2a]">
            <div className="flex py-2 px-3 items-center justify-between gap-2 self-stretch border-b-[1px] border-b-[#343434]">
              <div className="text-[#F5F5F5] text-xs">Text</div>
              <div
                className="cursor
              -pointer"
                onClick={handleEdit}
              >
                {!isEdit ? <EditIcon /> : <SaveIcon />}
              </div>
            </div>
            <div className="flex h-[56vh] gap-2 self-stretch bg-[#111111] overflow-x-scroll">
              {/* <span className="text-[#bfbfbf] text-xs font-normal non-italic leading-5">
                {props.task.description}
              </span> */}
              {isEdit ? (
                <textarea
                  name="text_aiResult"
                  value={aiResult}
                  onChange={(e) => {
                    setAIResult(e.target.value);
                  }}
                  className="textarea w-full h-full"
                >
                  {aiResult}
                </textarea>
              ) : (
                <div className="p-2 text-[#bfbfbf] text-xs font-normal non-italic leading-5">
                  <ReactMarkdown
                    className={`prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0`}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                      p({ children }) {
                        try {
                          return <p className="mb-2 last:mb-0">{children}</p>;
                        } catch (error) {
                          console.error("Error rendering paragraph", error);
                        }
                      },
                      strong({ children }) {
                        try {
                          return (
                            <strong className="text-sm">{children}</strong>
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      },
                      h2({ children }) {
                        try {
                          return (
                            <h2 className="text-[24px] mb-3">{children}</h2>
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      },
                      h3({ children }) {
                        try {
                          return (
                            <h3 className="text-[20px] mb-2">{children}</h3>
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      },
                      h4({ children }) {
                        try {
                          return (
                            <h4 className="text-[16px] mb-1">{children}</h4>
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      },
                      h5({ children }) {
                        try {
                          return (
                            <h5 className="text-[14px] mb-1">{children}</h5>
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      },
                    }}
                  >
                    {aiResult}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col bg-[#202020]">
          <div className="flex h-[75vh] px-3 py-5 flex-col items-start gap-3 shrink-0 border-b-[1px] border-b-[#343434] border-l-[1px] border-l-[#343434] relative">
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
              <div className="grid gap-2 border-b-[2px] border-b-[#252525] pb-4">
                <div className="flex gap-2 items-center">
                  <div className="rounded-full p-1 border border-base-200 bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 9"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1911_876)">
                        <path
                          d="M9.24978 0H7.28707L10.8663 9H12.829L9.24978 0ZM3.57924 0L0 9H2.00143L2.73339 7.11H6.47796L7.20991 9H9.21135L5.63211 0H3.57924ZM3.38085 5.43853L4.60567 2.27559L5.8305 5.43853H3.38085Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1911_876">
                          <rect width="13" height="9" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="font-500 text-base-content">Claude</div>
                  <div className="font-400 text-[11px] text-base-300">
                    {props.task.lastUpdated}
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="gap-2 items-start">
                  {textmessages?.map((item, index) => {
                    if (item.role === "user") {
                      return (
                        <div
                          key={index}
                          className="flex gap-2 grid grid-cols-10 mb-2"
                        >
                          <div className="col-span-1">
                            <Image
                              src={`/tmp/avatars/user.png`}
                              alt="user"
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className="text-xs font-normal text-base-300 leading-5 col-span-9">
                            {item.content}
                          </div>
                        </div>
                      );
                    }
                    return null; // Return null if the condition is not met
                  })}
                </div>
              </div>
            </div>
            <div className="absolute bg-[#212121] bottom-0 border-t border-base-200 items-end left-0 right-0 p-3 flex gap-2">
              <ChatInputAI
                sendMessage={sendMessage}
                message={prompt}
                setMessage={setPrompt}
              />
            </div>
          </div>
          <div className="flex justify-end px-5 py-4 text-base-content text-[11px] font-normal leading-[20px] ">
            <div className="flex gap-4">
              <PrimaryButton
                caption="Approve Task"
                icon={<></>}
                type={false}
                onClick={approveTask}
              />
              <PrimaryBorderButton
                caption="Reject"
                icon={<></>}
                type={false}
                // onClick={() => {
                //   dispatch(setTaskerModal(false));
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskerInterfaceModal;
