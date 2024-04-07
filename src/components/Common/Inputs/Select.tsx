import React from "react";

export type OptionType = {
    value: string;
    title: string;
}

export type SelectType = {
    options: OptionType[];
    value: string;
    setValue: Function;
    disabled: boolean;
}

const Select = (props: SelectType) => {

    return (
        <select className="select select-bordered" value={props.value} onChange={(e) => props.setValue(e.target.value)}>
            {props.options.map((option, index) => (
                <option 
                    key={index}
                    disabled = {props.disabled}
                    value={option.value}
                >{option.title}</option>
            ))}
        </select>
    );
}

export default Select;