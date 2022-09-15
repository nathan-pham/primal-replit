import { REPL_API } from "../config";
import { Store, Types } from "./useStore.d";

const useEvalCode = (contextId: string) => {
    const evalCode = async (code: string) => {
        const res = await fetch(REPL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contextId,
                code,
            }),
        });

        if (res.ok) {
            return (await res.json()).result as Store["result"];
        }

        return {
            "0": {
                type: "error",
                value: await res.text(),
            },
        } as Store["result"];
    };

    return {
        evalCode,
    };
};

export default useEvalCode;
