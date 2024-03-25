import React, { ReactNode } from "react";
import RightSidebar from "./RightSidebar";
import Header from "./Header";
import LeftSidebar from "./LeftSideBar";

type LayoutType = {
    header?: ReactNode;
    rightSidebar?: ReactNode;
    children: ReactNode;
}

const Layout = (props: LayoutType) => {

    return (
        <div className="flex">
            <LeftSidebar />
            <div className={`w-[calc(100vw-240px)] h-[100vh]`}>
                {props.header ? props.header: (
                    <Header />
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