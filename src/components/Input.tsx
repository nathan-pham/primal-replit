import { IoChevronForwardOutline } from "react-icons/io5";
import { useState } from "react";
import { REPL_API } from "../config";

import useStore from "../hooks/useStore";
import { Store } from "../hooks/useStore.d";

const Input = () => {
    const [code, setCode] = useState("");
    const set = useStore((state) => state.set);
    const contextId = useStore((state) => state.contextId);

    return (
        <div className="flex items-center gap-2">
            <div>
                <IoChevronForwardOutline />
            </div>
            <form onSubmit={async (e) => {}}>
                <textarea
                    className="w-full outline-none border"
                    value={code}
                    onInput={(e) => {
                        setCode((e.target as HTMLInputElement).value);
                    }}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();

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
                />
            </form>
        </div>
    );
};

export default Input;
