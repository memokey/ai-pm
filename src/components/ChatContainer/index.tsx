'use client'

import React, { useEffect } from "react";
import { ChatInput } from "../Common/Inputs";
import Chatbox from "./Chatbox";
import { useAppSelector } from "@/redux/hooks";
import { AgentsModal, BaseModal, ReviewersModal } from "../Common/Modals";

const ChatContainer = () => {
    const { baseModal, reviewerModal, agentModal } = useAppSelector((state) => state.chat);
    return (
        <div className="w-[calc(100vw-540px)] relative h-[calc(100vh-56px)] mx-auto pt-[20px]">
            <div className="w-full h-[calc(100vh-156px)] overflow-y-auto pb-10 px-[95px]">
                <Chatbox />
            </div>
            <div className="w-full absolute bottom-[23px] px-[95px]">
                <ChatInput />
            </div>
            {!!baseModal && (
                <BaseModal
                    title="Virtual Assistant"
                    description={<p>Understanding Features and Assessment Creation
                        FormsWise.AI is a powerful software tool that allows users to easily create detailed and functional assessments. With a user-friendly interface and a wide range of features, FormsWise.AI makes the assessment creation process a breeze. In this document, we will explore some of the key features of FormsWise.AI and provide a step-by-step guide on how to create an assessment using this tool.
                        <br/><br/>
                        <b>Getting Started with FormsWise.AI</b>
                        <br/><br/>
                        To get started with FormsWise.AI, you first need to create an account. Simply go to the FormsWise.AI website and click on the Sign Up button. Once you have created an account, you can log in to the platform and start exploring its features.
                        The main dashboard of FormsWise.AI displays all the assessments that you have created. If you are a new user, you will see a blank dashboard. To create a new assessment, click on the Create Assessment button.
                        Features of FormsWise.AI
                        <br/><br/>
                        <b>1. Drag and Drop Interface</b>
                        <br/><br/>
                        The drag and drop interface of FormsWise.AI makes it easy for users to add different elements to their assessments. Users can simply drag and drop questions, images, videos, and other elements onto the assessment canvas to create a visually appealing and engaging assessment.
                        <br/><br/>
                        <b>1. Customizable Themes and Templates</b>
                        <br/><br/>
                        FormsWise.AI offers a range of customizable themes and templates that users can choose from while creating their assessments. These themes and templates not only make the assessment look more professional but also save a lot of time and effort.</p>}
                />
            )}
            {!!reviewerModal && (
                <ReviewersModal
                    title="Human Reviewers"
                />
            )}
            {!!agentModal && (
                <AgentsModal 
                    title="AI Agents"
                />
            )}
        </div>
    );
}

export default ChatContainer;