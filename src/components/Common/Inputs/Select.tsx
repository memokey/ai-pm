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
        <select className="select select-bordered">
            {props.options.map((option, index) => (
                <option 
                    key={index}
                    selected = {option.value == props.value}
                    disabled = {props.disabled}
                    value={option.value}
                    onClick={() => props.setValue(option.value)}
                >{option.title}</option>
            ))}
        </select>
    );
}

export default Select;