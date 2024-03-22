import React from "react";
import Title from "./Title";

const Header = () => {
    return (
        <div className="h-[56px] flex justify-between border-b border-base-200 py-[18px] px-6">
            <Title 
                title="Generate PRD Report"
            />
        </div>
    );
}

export default Header;