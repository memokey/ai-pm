import React, { ReactNode } from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

type LayoutType = {
    children: ReactNode;
}

const Layout = (props: LayoutType) => {
    return (
        <>
            <Header />
            <div className="flex h-[calc(100vh-120px)]">
                <LeftSidebar />
                <div className="w-[calc(100vw-820px)]">
                    {props.children}
                </div>
                <RightSidebar />
            </div>
        </>
    );
}

export default Layout;