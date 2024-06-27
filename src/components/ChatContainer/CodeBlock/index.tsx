// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FC, memo } from "react";
import { CheckIcon, CopyIcon } from "@/components/Icons";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export interface Props {
    language: string;
    value: string;
}

export interface languageMap {
    [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
    javascript: ".js",
    python: ".py",
    java: ".java",
    c: ".c",
    cpp: ".cpp",
    "c++": ".cpp",
    "c#": ".cs",
    ruby: ".rb",
    php: ".php",
    swift: ".swift",
    "objective-c": ".m",
    kotlin: ".kt",
    typescript: ".ts",
    go: ".go",
    perl: ".pl",
    rust: ".rs",
    scala: ".scala",
    haskell: ".hs",
    lua: ".lua",
    shell: ".sh",
    sql: ".sql",
    html: ".html",
    css: ".css",
    // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

    const onCopy = () => {
        if (isCopied) return;
        copyToClipboard(value);
    };

    return (
        <div className="relative w-full font-sans codeblock bg-zinc-950">
            <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100">
                <span className="text-xs lowercase">{language}</span>
                <div className="flex items-center space-x-1">
                    {/* <Button
                    variant="ghost"
                    className="hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
                    onClick={downloadAsFile}
                    size="icon"
                >
                    <IconDownload />
                    <span className="sr-only">Download</span>
                </Button> */}
                    <button
                        className="text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
                        onClick={onCopy}
                    >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                        <span className="sr-only">Copy code</span>
                    </button>
                </div>
            </div>
            <SyntaxHighlighter
                language={language}
                style={oneLight}
                PreTag="div"
                showLineNumbers
                customStyle={{
                    margin: 0,
                    width: "100%",
                    background: "transparent",
                    padding: "1.5rem 1rem",
                }}
                codeTagProps={{
                    style: {
                        fontSize: "0.9rem",
                        fontFamily: "var(--font-mono)",
                    },
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
});

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
