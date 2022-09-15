import { useState } from "react";
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

    return (
        <div className="flex gap-2 mt-2">
            <Chevron />
            <textarea
                className="w-full overflow-y-hidden outline-none border-none bg-inherit resize-none"
                onInput={(e) => {
                    const input = e.target as HTMLTextAreaElement;

                    setHistoryIndex(-1);
                    setCode(input.value);
                    input.style.height = "1px";
                    input.style.height = `${input.scrollHeight}px`;
                }}
                onKeyDown={async (e) => {
                    // manage history
                    if (e.key === "ArrowUp") {
                        const newHistoryIndex = historyIndex + 1;

                        setHistoryIndex(newHistoryIndex);
                        setCode(history[newHistoryIndex]);
                    } else if (e.key === "ArrowDown") {
                        const newHistoryIndex = historyIndex - 1;

                        setHistoryIndex(newHistoryIndex);
                        setCode(history[newHistoryIndex]);
                    }

                    // commit & evaluate code
                    else if (!e.shiftKey && e.key === "Enter") {
                        e.preventDefault();

                        const result = await evalCode(code);
                        set((store) => {
                            store.context.push(code);
                            result && store.context.push(result);
                        });

                        setCode("");
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
