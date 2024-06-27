/* eslint-disable react/no-children-prop */
"use client";

import { PlussmIcon, SlashIcon, EditIcon, SaveIcon } from "@/components/Icons";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setHistory,
  setLoading,
  setTextMessages,
} from "@/redux/slices/chatSlice";
import { TaskType } from "@/data/types/type";
import { ChatInputAI } from "../Inputs";
import { PrimaryBorderButton, PrimaryButton } from "../Buttons";
import { setExecuteCodeModal } from "@/redux/slices/taskSlice";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { apiCaller } from "@/utils/fetcher";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { TextMessageType } from "@/components/ChatContainer/Chatbox/UserMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import GenerateProjectPrompt from "@/data/Prompts/GenerateProjectPrompt";
import TreeView from "@/components/TaskBoard/TreeView";
import { TreeNode } from "@/data/types/type";
import { CodeBlock } from "../CodeBlock";
export type ModalType = {
  title: string;
  task: TaskType;
  tasks: TaskType[];
};

const CodeInterfaceModal = (props: ModalType) => {
  const { auth, history, loading, textmessages } = useAppSelector((state) => ({
    auth: state.auth,
    history: state.chat.history,
    loading: state.chat.loading,
    textmessages: state.chat.textmessages,
  }));
  const parentTask = props.tasks.filter(
    (task) => task.id == props.task.parentId
  );
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [sendingMessages, setSendingMessages] = useState<string[]>([]);
  const [aiResult, setAIResult] = useState<TreeNode>();
  const [selectedNode, setSelectedNode] = useState<TreeNode>();
  const [code, setCode] = useState("");

  const handleNodeClick = (node: TreeNode) => {
    console.log(node.code);
    setSelectedNode(node);
    if (node.code) {
      setCode(node.code);
    }
  };

  const closeDlg = (e: any) => {
    if (
      !!e.target.className.includes &&
      e.target.className.includes("room_setting_dlg")
    ) {
      dispatch(setExecuteCodeModal(false));
    }
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const fetchTask = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiCaller.get(`/api/tasks/${props.task.id}/`);
      let messages = [];
      const firstPrompt = `
        Parent Task Title: ${parentTask[0].title}
        Parent Task Description: ${parentTask[0].description}
        Task Description: ${props.task.description}        
      `;
      if (response.data.chat.length == 0) {
        dispatch(setHistory([]));
        const firstMessage: TextMessageType[] = [
          {
            role: "system",
            content: GenerateProjectPrompt,
          },
          {
            role: "user",
            content: firstPrompt,
          },
        ];
        try {
          dispatch(setLoading(true));
          setSendingMessages([firstPrompt]);
          const response = await getOpenAIResponse(firstMessage);
          console.log(response.content);
          setAIResult(JSON.parse(response.content));

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
              history: [...newMessages],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          dispatch(setHistory(chatSaveResponse.task.chat[0].history));
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
          const userMessagesHistory = messages
            .filter((message) => message.role === "user")
            .map((message) => message.content);

          setSendingMessages(userMessagesHistory);
          dispatch(setHistory(chat.history));
        }
        // setPdfUrl(response.data.documentURl)
        dispatch(setTextMessages(messages));
        setAIResult(JSON.parse(messages[messages.length - 1]["content"]));
      }

      dispatch(setLoading(false));
    } catch (error) {
      console.error("Fetching task issue.");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

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

  const sendMessage = async () => {
    if (loading) {
      alert("please wait response");
    } else {
      if (prompt.trim().length === 0) {
        return;
      }
      const tmpMessages: TextMessageType[] = JSON.parse(
        JSON.stringify([...textmessages, { content: prompt, role: "user" }])
      );
      try {
        dispatch(setLoading(true));
        setSendingMessages([...sendingMessages, prompt]);
        const response = await getOpenAIResponse(tmpMessages);
        dispatch(setLoading(false));

        setPrompt("");
        setAIResult(JSON.parse(response.content));

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
        dispatch(setTextMessages(newMessages));
      } catch (error) {
        console.error("Error getting response from OpenAI API:", error);
      }
    }
  };

  return (
    <div
      className="fixed top-[0px] left-[0px] right-[0px] bottom-[0px] backdrop-blur-[20px] z-[1002] justify-center items-center room_setting_dlg"
      onClick={(e) => closeDlg(e)}
    >
      <div className="w-[70vw] h-[92vh] mt-[5vh] rounded-[6px] top-10 bg-[#191919] shadow-[#141414] shadow-lg border border-[#212121] mx-auto">
        <div className="flex justify-between px-5 py-4 text-base-content text-[14px] font-500 leading-[20px] border-b border-base-200">
          <h2 className="">{props.title}</h2>
          <div className="flex gap-4">
            <PrimaryButton caption="Submit Task" icon={<></>} type={false} />
            <PrimaryBorderButton
              caption="Close"
              icon={<></>}
              type={false}
              onClick={() => {
                dispatch(setExecuteCodeModal(false));
              }}
            />
          </div>
        </div>
        <div className="text-[13px] text-base-300 py-4 px-5 grid grid-cols-10 gap-2">
          <div className="col-span-2 border-2  h-[calc(84vh-46px)] rounded-[4px] border-[#343434]">
            <div className="h-8 text-xs bg-[#252525] p-2">Tree View</div>
            <div className="text-xs p-2 h">
              {aiResult && (
                <TreeView
                  node={aiResult as TreeNode}
                  onNodeClick={handleNodeClick}
                />
              )}
            </div>
          </div>
          <div className="col-span-5 border-2  h-[calc(84vh-46px)] rounded-[4px] border-[#343434]">
            <div className="h-8 bg-[#252525] p-2 flex justify-between">
              <div className="text-xs">Code</div>
              <div className="cursor-pointer" onClick={handleEdit}>
                {!isEdit ? <EditIcon /> : <SaveIcon />}
              </div>
            </div>
            <div className="h-[calc(84vh-88px)]">
              {isEdit ? (
                <textarea
                  name="text_aiResult"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  className="textarea w-full h-full"
                >
                  {code}
                </textarea>
              ) : (
                <div className="p-2 text-[#bfbfbf] text-xs font-normal non-italic leading-5">
                  <ReactMarkdown
                    className={`prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0`}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                      code({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) {
                        try {
                          if (children && children.length) {
                            if (children[0] == "▍") {
                              return (
                                <span className="mt-1 cursor-default animate-pulse">
                                  ▍
                                </span>
                              );
                            }
                          }

                          const match = /language-(\w+)/.exec(className || "");

                          if (inline) {
                            return (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          }

                          return (
                            <CodeBlock
                              key={Math.random()}
                              language={(match && match[1]) || ""}
                              value={String(children).replace(/\n$/, "")}
                              {...props}
                            />
                          );
                        } catch (error) {
                          console.error("Error rendering code block", error);
                        }
                      },
                    }}
                  >
                    {code}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3 border-2  h-[calc(84vh-46px)] rounded-[4px] border-[#343434] relative">
            <div className="h-8 text-xs bg-[#252525] p-2">Activity</div>
            <div className="grid gap-3 p-3 text-[12px]">
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
                  {sendingMessages?.map((item, index) => {
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
                          {item}
                        </div>
                      </div>
                    );
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
        </div>
      </div>
    </div>
  );
};

export default CodeInterfaceModal;
