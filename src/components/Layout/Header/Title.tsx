import React from "react";

const Title = (props:{title: string}) => {
    return (
        <h1
            className="text-white text-[16px]"
        >{props.title}</h1>
    );
}

export default Title;