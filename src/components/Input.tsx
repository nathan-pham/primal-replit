import { useState } from "react";
import { REPL_API } from "../config";

import useStore from "../hooks/useStore";
import { Store } from "../hooks/useStore.d";
import Chevron from "./Chevron";

const Input = () => {
    const [code, setCode] = useState("");
    const [set, contextId] = useStore((state) => [state.set, state.contextId]);

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
                    if (e.key === "Enter" && e.shiftKey) {
                        // setCode(e.target.value + "\n");
                    } else if (e.key === "Enter") {
                        e.preventDefault();

                        console.log("ok");

                        const res = (
                            await fetch(REPL_API, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    contextId,
                                    code,
                                }),
                            }).then((res) => res.json())
                        ).result as Store["result"];

                        set((store) => {
                            store.context.push(code);
                            store.context.push(res);
                        });

                        console.log(JSON.stringify(res, null, 4));
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
