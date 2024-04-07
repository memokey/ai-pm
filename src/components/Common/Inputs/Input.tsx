import React, { useState } from 'react'

type InputType = {
    value: string
    setValue: Function
    disabled: boolean
    placeholder?: string;
    styles?: string;
}

const Input = (props: InputType) => {

    return (    
            <input
                className={`input input-bordered w-full outline-none ${props.styles}`}
                onChange={(e) => {
                    props.setValue(e.target.value)
                }}
                value={props.value}
                autoFocus={true}
                placeholder={props.placeholder}
            />
    )
}

export default Input
