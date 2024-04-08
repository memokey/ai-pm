import React, { ReactNode } from "react";
import RightSidebar from "./RightSidebar";
import Header from "./Header";
import LeftSidebar from "./LeftSideBar";

type LayoutType = {
    header?: ReactNode;
    rightSidebar?: ReactNode;
    leftSidebar?: ReactNode;
    children: ReactNode;
}

const Layout = (props: LayoutType) => {

    return (
        <div className="flex">
            {props.leftSidebar ? props.leftSidebar : <LeftSidebar />}
            <div className={`w-[calc(100vw-240px)] h-[100vh]`}>
                {props.header ? props.header: (
                    <Header 
                        title="PRD Report"
                    />
                )}
                <div className="flex h-[calc(100vh-56px)]">
                    {props.children}
                    {props.rightSidebar && (
                        props.rightSidebar
                    )}
                </div>
            </div>
        </div>
    );
}

export default Layout;