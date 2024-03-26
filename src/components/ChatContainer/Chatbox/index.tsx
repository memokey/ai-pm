import React from "react";
import { CONSTANTS } from "@/config/constants";
import Message from "./UserMessage";

const Chatbox = () => {
    return (
        <div className="grid gap-6 w-full">
            {/* <div className="grid gap-4 w-full">
                <h1 className="text-[48px] font-[400] traking-tighter">
                    Hello, 
                    <span className="name-linear font-[700]">Thomas</span>
                    <br />
                    Write down any task?
                </h1>
                <p className="text-[20px] font-[400] leading-[30px] text-base-300">Please Write down task along with description for AI so we can
    generate detail report for you</p>
            </div> */}
            <Message
                type={CONSTANTS.USER_MESSAGE_TYPE}
                message={`I need Virtual Assistant for Company Assessment FormCreation:\nCreate comprehensive assessments using FormsWise.AI tailored to BEF’s requirements.\nIntegrate assessment forms with n8n to automate workflows, including data capture and processing.
                Set up and maintain integrations between FormsWise.AI, Google Sheets, and Google Docs to ensure seamless data flow and accessibility.\nManage and configure API keys securely and efficiently.
                Embed forms onto BEF’s website and other digital platforms as needed, ensuring a smooth user experience. Troubleshoot any issues related to form integrations or data management.`}
            />
            <Message 
                type={CONSTANTS.BOT_MESSAGE_TYPE}
                title={`Here is detailed report on how we can proceed?`}
                message={`I need Virtual Assistant for Company Assessment FormCreation: Create comprehensive assessments using FormsWise.AI tailored to BEF’s requirements.`}
                action={CONSTANTS.DETAIL_ACTION}
            />
            <Message
                type={CONSTANTS.USER_MESSAGE_TYPE}
                message={`Yes`}
            />
            <Message 
                type={CONSTANTS.BOT_MESSAGE_TYPE}
                message={`Ok, starting decomposition and assignment`}
                action={CONSTANTS.TASKS_ACTION}
            />
        </div>
    );
}

export default Chatbox;