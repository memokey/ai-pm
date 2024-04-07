import React from "react";

export type RegisterProcessType = {
    step: Number;
};

const RegisterProcess = (props: RegisterProcessType) => {
    return (
        <div className="flex gap-[6px] mb-[36px]">
            {
                [1, 2, 3, 4, 5].map((count) => (
                    <div className="w-[45px] h-[4px] rounded-[2px]" style={{backgroundColor: count == props.step ? "#F5F5F5": "#585757"}}></div>
                ))
            }
        </div>
    );
}

export default RegisterProcess;