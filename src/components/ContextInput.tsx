import { useEffect, useState } from "react";
import useEvalCode from "../hooks/useEvalCode";

import useStore from "../hooks/useStore";
import Chevron from "./Chevron";

const ContextInput = () => {
    const [code, setCode] = useState("");
    const [set, context] = useStore((state) => [state.set, state.context]);

    const { evalCode } = useEvalCode();

    // manage history
    const [historyIndex, setHistoryIndex] = useState(-1);
    const history = context
        .filter((value) => typeof value === "string")
        .reverse() as string[];

    // scroll to bottom when necessary
    useEffect(() => {
        window.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, [context]);

    return (
        <div className="flex gap-2 mt-2">
            <Chevron />
            <textarea
                className="w-full overflow-y-hidden outline-none border-none bg-inherit resize-none"
                onInput={(e) => {
                    const textarea = e.target as HTMLTextAreaElement;

                    setHistoryIndex(-1);
                    setCode(textarea.value);

                    // adjust textarea to fit content
                    textarea.style.height = "1px";
                    textarea.style.height = `${textarea.scrollHeight}px`;
                }}
                onKeyDown={async (e) => {
                    const textarea = e.target as HTMLTextAreaElement;

                    // manage history
                    if (code.trim() === "" || history.includes(code)) {
                        if (e.key === "ArrowUp") {
                            const newHistoryIndex = historyIndex + 1;

                            setHistoryIndex(newHistoryIndex);
                            setCode(history[newHistoryIndex]);
                        } else if (e.key === "ArrowDown") {
                            const newHistoryIndex = historyIndex - 1;

                            setHistoryIndex(newHistoryIndex);
                            setCode(history[newHistoryIndex]);
                        }
                    }

                    // manage tabs
                    if (e.key == "Tab") {
                        e.preventDefault();

                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const tab = "    ";

                        // insert spaces & adjust cursor
                        const newCode =
                            code.substring(0, start) +
                            tab +
                            code.substring(end);

                        textarea.value = newCode;
                        textarea.setSelectionRange(
                            start + tab.length,
                            start + tab.length
                        );

                        setCode(newCode);
                    }

                    // commit & evaluate code
                    else if (!e.shiftKey && e.key === "Enter") {
                        e.preventDefault();

                        const codeCache = code;
                        setCode("");

                        set((store) => {
                            store.context.push(codeCache);
                        });

                        const result = await evalCode(codeCache);
                        set((store) => {
                            result && store.context.push(result);
                        });
                    }
                }}
                value={code}
                spellCheck={false}
                autoComplete="off"
            />
        </div>
    );
};

export default ContextInput;
