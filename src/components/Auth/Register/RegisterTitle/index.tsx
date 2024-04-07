import React from "react";

type TitleType = {
    title: string;
    styles?: string;
}

const RegisterTitle = (props: TitleType) => {
    return (
        <div className={`text-[24px] font-300 text-base-content ${props.styles ? props.styles: ''}`}>{props.title}</div>
    );
}

export default RegisterTitle;