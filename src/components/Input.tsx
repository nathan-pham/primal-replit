import { useState } from "react";
import { REPL_API } from "../config";
import useEvalCode from "../hooks/useEvalCode";

import useStore from "../hooks/useStore";
import { Store } from "../hooks/useStore.d";
import Chevron from "./Chevron";

const Input = () => {
    const [code, setCode] = useState("");
    const [set, contextId] = useStore((state) => [state.set, state.contextId]);
    const { evalCode } = useEvalCode(contextId);

    return (
        <div className="flex gap-2 mt-2">
            <Chevron />
            <textarea
                className="w-full overflow-y-hidden outline-none border-none bg-inherit resize-none"
                onInput={(e) => {
                    const input = e.target as HTMLTextAreaElement;

                    setCode(input.value);
                    input.style.height = "1px";
                    input.style.height = `${input.scrollHeight}px`;
                }}
                onKeyDown={async (e) => {
                    if (!e.shiftKey && e.key === "Enter") {
                        e.preventDefault();

                        const result = await evalCode(code);

                        set((store) => {
                            store.context.push(code);
                            store.context.push(result);
                        });

                        console.log(JSON.stringify(result, null, 4));
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

export default Input;
