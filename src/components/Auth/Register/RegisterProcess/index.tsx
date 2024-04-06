import React from "react";

export type RegisterProcessType = {
    step: number;
};

const RegisterProcess = (props: RegisterProcessType) => {
    return (
        <div className="flex gap-[6px]">
            {
                [1, 2, 3, 4].map((count) => (
                    <div className="w-[45px] h-[4px] rounded-[2px]" style={{backgroundColor: ""}}></div>
                ))
            }
        </div>
    );
}

export default RegisterProcess;