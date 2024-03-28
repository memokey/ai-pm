import React from "react";
import Title from "./Title";
import BalanceBox from "./BalanceBox";

const Header = () => {
    return (
        <div className="h-[56px] flex justify-between border-b border-base-200 py-[16px] px-6">
            <Title 
                title="PRD Report"
            />
            <BalanceBox 
                balance={9669}
            />
        </div>
    );
}

export default Header;