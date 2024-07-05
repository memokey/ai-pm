"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import ReactMarkdown, { Components } from "react-markdown";
import axios from "axios";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  setHistory,
  setLoading,
  setTextMessages,
} from "@/redux/slices/chatSlice";
import { setExecuteDocumentationModal } from "@/redux/slices/taskSlice";
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
  UploadIcon,
} from "@/components/Icons";
import GenerateDocumentkPrompt from "@/data/Prompts/GenerateDocumentkPrompt";
import RingLoader from "react-spinners/RingLoader";

export type ModalType = {
  title: string;
  task: TaskType;
  tasks: Array<TaskType>;
};

const TaskerInterfaceModal = (props: ModalType) => {
  const parentTask = props.tasks.filter(
    (task) => task.id == props.task.parentId
  );
  var subtasks = props.tasks.filter(
    (task) => task.parentId == props.task.parentId
  );
  const { auth, history, loading, textmessages } = useAppSelector((state) => ({
    auth: state.auth,
    history: state.chat.history,
    loading: state.chat.loading,
    textmessages: state.chat.textmessages,
  }));

  const dispatch = useDispatch();
  const [isExpand, setIsExpand] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAIResult] = useState<string>("");
  const [sendingMessages, setSendingMessages] = useState<string[]>([]);
  const [selectedTask, setSeletedTask] = useState<any>(props.task);
  const [selectedtaskID, setSeletedTaskID] = useState<string>(props.task.id);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleChangeTask = (task_id: string) => {
    console.log("task_id", task_id);
    if (selectedtaskID != task_id) {
      setIsEdit(false);
      setPrompt("");
      setAIResult("");
      setSendingMessages([]);
      const selectNewTask = props.tasks.filter((task) => task.id == task_id)[0];
      setSeletedTaskID(selectNewTask.id);
      setSeletedTask(selectNewTask);
    }
  };

  const fetchTask = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiCaller.get(`/api/tasks/${selectedtaskID}/`);
      let messages = [];
      const firstPrompt =
        "The task title is " +
        selectedTask.title +
        ". The subtask description is " +
        selectedTask.description +
        " Let's make documentation to do it";
      if (response.data.chat.length == 0) {
        dispatch(setHistory([]));
        const firstMessage: TextMessageType[] = [
          {
            role: "system",
            content: GenerateDocumentkPrompt,
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
          dispatch(setLoading(false));

          setPrompt("");
          setAIResult(response.content);

          const newMessages: TextMessageType[] = [
            ...firstMessage,
            { role: response.role, content: response.content },
          ];
          dispatch(setTextMessages(newMessages));
          const chatSaveResponse: any = await apiCaller.post(
            `/api/tasks/subtask/chat/${selectedtaskID}/`,
            {
              message: firstPrompt,
              response: response.content,
              history: [
                {
                  role: "system",
                  content: GenerateDocumentkPrompt,
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
        setAIResult(messages[messages.length - 1]["content"]);
      }

      dispatch(setLoading(false));
    } catch (error) {
      console.error("Fetching task issue.");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [selectedtaskID]);

  const closeDlg = (e: any) => {
    if (
      !!e.target.className.includes &&
      e.target.className.includes("room_setting_dlg")
    ) {
      dispatch(setExecuteDocumentationModal(false));
    }
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
        setAIResult(response.content);

        const newMessages: TextMessageType[] = [
          ...tmpMessages,
          {
            role: response.role,
            content: response.content,
          },
        ];
        const chatSaveResponse = await apiCaller.post(
          `/api/tasks/subtask/chat/${selectedtaskID}/`,
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

  const handleReject = () => {
    dispatch(setExecuteDocumentationModal(false));
  };
  const approveTask = async () => {
    const params = {
      task_id: selectedtaskID,
      description: "This is done by OpenAI",
      document: [pdfUrl],
    };
    try {
      const res = await apiCaller.post("/api/tasks/approveTaskByAI/", params);
      if (res.data._id) {
        dispatch(
          updateTask({
            taskId: res.data._id,
            task: res.data,
          })
        );
      }
      dispatch(setExecuteDocumentationModal(false));
    } catch (error) {
      console.error("Approvement error");
    }
  };

  const downloadPDF = () => {
    const pdfURL = pdfUrl;

    fetch(pdfURL)
      .then((response) => response.blob())
      .then((blob: any) => {
        // Create blob link to download
        console.log("downloadBlob", blob);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "documentation.pdf"); // Specify the file name
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error("Error fetching or downloading PDF", error);
        // Handle errors here
      });
  };

  const uploadResult = async () => {
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 708.66; // B4 page width in points
    const pageHeight = 1000.63; // B4 page height in points
    const margin = 50;
    const fontSize = 12;

    const parseMarkdown = (markdown: any) => {
      const lines = markdown.split("\n");
      return lines.map((line: any) => {
        if (line.startsWith("# ")) {
          return { text: line.substring(2), fontSize: 24 };
        } else if (line.startsWith("## ")) {
          return { text: line.substring(3), fontSize: 20 };
        } else if (line.startsWith("### ")) {
          return { text: line.substring(4), fontSize: 18 };
        } else if (line.startsWith("#### ")) {
          return { text: line.substring(5), fontSize: 16 };
        } else if (line.startsWith("##### ")) {
          return { text: line.substring(6), fontSize: 14 };
        } else if (line.startsWith("###### ")) {
          return { text: line.substring(7), fontSize: 12 };
        } else {
          return { text: line, fontSize: 12 };
        }
      });
    };

    const wrapText = (text: any, font: any, fontSize: any, maxWidth: any) => {
      const words = text.split(" ");
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = font.widthOfTextAtSize(
          currentLine + " " + word,
          fontSize
        );
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    const parsedContent = parseMarkdown(aiResult);

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let { width, height } = page.getSize();
    let yPosition = height - margin;

    parsedContent.forEach((item: any) => {
      const lines = wrapText(
        item.text,
        timesRomanFont,
        item.fontSize,
        width - 2 * margin
      );
      lines.forEach((line) => {
        if (yPosition - item.fontSize < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = height - margin;
        }
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: item.fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= item.fontSize + 5;
      });
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const presetName = process.env.NEXT_PUBLIC_PRESET_NAME;
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    if (!presetName) {
      throw new Error("NEXT_PUBLIC_PRESET_NAME is not defined");
    }

    if (!cloudName) {
      throw new Error("NEXT_PUBLIC_CLOUD_NAME is not defined");
    }

    const formData = new FormData();
    formData.append("file", blob, "document.pdf");
    formData.append("upload_preset", presetName);
    formData.append("cloud_name", cloudName);
    formData.append("folder", "assets/documents");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData
      );
      setPdfUrl(response.data.url);
      alert("PDF uploaded successfully!");
      console.log("PDF uploaded successfully:", response.data.url);
    } catch (error) {
      console.error("Error uploading PDF:", error);
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
            <PrimaryButton
              caption="Approve Task"
              icon={<></>}
              type={false}
              onClick={approveTask}
            />
            <PrimaryBorderButton
              caption="Close"
              icon={<></>}
              type={false}
              onClick={handleReject}
            />
          </div>
        </div>
        <div className="text-[13px] text-base-300 py-4 px-5 grid grid-cols-10 gap-2">
          <div className="col-span-2 border-2  h-[calc(84vh-46px)] rounded-[4px] border-[#343434] overflow-hidden">
            <div>
              <button
                className="text-left text-base font-semibold flex items-center w-full focus:outline-none bg-[#333] rounded-[3px] p-[4px]"
                onClick={handleExpand}
              >
                <div className="pr-[4px]">
                  {isExpand ? <DownArrowIcon /> : <RightIcon />}
                </div>
                <span className="text-[#979797] text-xs">
                  {parentTask[0].title}
                </span>
              </button>
            </div>
            {isExpand && (
              <ul className="pl-[2vh] pt-[1vh]">
                {subtasks.map((task) => (
                  <li
                    key={task.id}
                    className={`flex items-center pl-2 mb-0 pb-2 border-l-2 cursor-pointer ${
                      task.id == selectedtaskID
                        ? "border-[#888888]"
                        : "border-[#474747]"
                    }`}
                    onClick={() => handleChangeTask(task.id)}
                  >
                    {task.id == selectedtaskID ? (
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
                        task.id == selectedtaskID
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
          <div className="col-span-5 border-2  h-[calc(84vh-46px)] rounded-[4px] border-[#343434]">
            <div className="h-8 bg-[#252525] p-2 flex justify-between">
              <div className="text-xs">Description</div>
              <div>
                <div className="flex gap-2">
                  <div onClick={uploadResult} className="cursor-pointer">
                    <UploadIcon />
                  </div>
                  <div
                    className="cursor-pointer flex gap-2"
                    onClick={handleEdit}
                  >
                    {!isEdit ? (
                      <div>
                        <EditIcon />
                      </div>
                    ) : (
                      <div>
                        <SaveIcon />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start self-stretch rounded-lg bg-[#2a2a2a] mt-2">
              <div className="flex py-2 px-3 items-center justify-between gap-2 self-stretch border-b-[1px] border-b-[#343434]">
                <div className="text-[#F5F5F5] text-xs">Text</div>
              </div>
              <div className="flex h-[70vh] gap-2 self-stretch bg-[#111111] overflow-x-scroll pt-2 justify-center">
                {/* <span className="text-[#bfbfbf] text-xs font-normal non-italic leading-5">
                {props.task.description}
              </span> */}
                {loading ? (
                  <div className="h-[70vh] flex justify-center">
                    <div className="m-auto">
                      <RingLoader color="#04cd76" size={30} />
                    </div>
                  </div>
                ) : (
                  <div className="70vh">
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
                                return (
                                  <p className="mb-2 last:mb-0">{children}</p>
                                );
                              } catch (error) {
                                console.error(
                                  "Error rendering paragraph",
                                  error
                                );
                              }
                            },
                            strong({ children }) {
                              try {
                                return (
                                  <strong className="text-sm">
                                    {children}
                                  </strong>
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            },
                            h1({ children }) {
                              try {
                                return (
                                  <h1 className="text-[24px] leading-[24px] mb-3">
                                    {children}
                                  </h1>
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            },
                            h2({ children }) {
                              try {
                                return (
                                  <h2 className="text-[20px] leading-[20px] mb-3">
                                    {children}
                                  </h2>
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            },
                            h3({ children }) {
                              try {
                                return (
                                  <h3 className="text-[18px] leading-[18px] mb-2">
                                    {children}
                                  </h3>
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            },
                            h4({ children }) {
                              try {
                                return (
                                  <h4 className="text-[16px] leading-[16px] mb-1">
                                    {children}
                                  </h4>
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            },
                            h5({ children }) {
                              try {
                                return (
                                  <h5 className="text-[14px] leading-[14px] mb-1">
                                    {children}
                                  </h5>
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            },
                            pre({ children }) {
                              try {
                                return (
                                  <pre className="bg-[#010101] m-1 p-2 rounded-lg">
                                    {children}
                                  </pre>
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            },
                            ol({ children }) {
                              try {
                                return (
                                  <ol className="list-disc">{children}</ol>
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
                )}
              </div>
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

export default TaskerInterfaceModal;
