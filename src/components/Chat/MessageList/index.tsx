import React from "react";
import Message from "../Message";

const MessageList = () => {
    return (
        <div className="h-[calc(100vh-200px)]">
            <Message
                sender={true}
                content="Developing AI project management tools involves various stages, from conceptualization to development and implementation. Here's how I can assist you through each phase:

                1. Conceptualization and Planning
                Idea Generation: Suggest innovative features based on current AI and project management trends.
                Requirements Gathering: Help you formulate functional and non-functional requirements for your tool.
                Scope Definition: Assist in defining the scope of your AI project management tool, including the identification of potential limitations and challenges.
                2. Design
                Architecture Design: Provide insights on designing the architecture of your tool, including choosing between a monolithic and microservices architecture.
                UI/UX Design: Offer advice on user interface and user experience best practices to make your tool intuitive and user-friendly." 
            />
            <Message
                sender={false}
                content="How can you help me to developer AI project management tools?" 
            />
        </div>
    );
}

export default MessageList;