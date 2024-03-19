import { ClipboardCheckIcon, ClipboardIcon } from "@/components/Icons";
import React, { useState } from "react";

export type ClipboardType = {
    clipboard: string;
}
const Clipboard = (props: ClipboardType) => {
    const [copyClip, setCopyClip] = useState<Boolean>(false);

    const clickCopyClip = () => {
        setCopyClip(true);
        navigator.clipboard.writeText(props.clipboard)
        setTimeout(() => {
            setCopyClip(false);
        }, 500);
    }

    return (
        <div className="cursor-pointer hover:text-primary" onClick={clickCopyClip}>
            {copyClip ? (
                <ClipboardCheckIcon />    
            ) : (
                <ClipboardIcon />
            )}
        </div>
    );
}

export default Clipboard;