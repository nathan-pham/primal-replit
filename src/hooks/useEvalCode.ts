import { REPL_API } from "../config";
import useStore from "./useStore";
import { Store } from "./useStore.d";
import customBlock from "../utils/customBlock";
import useDirectives from "./useDirectives";

const useEvalCode = () => {
    const contextId = useStore((state) => state.contextId);
    const { evalDirective } = useDirectives();

    const evalCode = async (code: string) => {
        // manage directives
        if (code.startsWith(".")) {
            return evalDirective(code.slice(1));
        }

        // send request
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

        return customBlock("error", await res.text());
    };

    return {
        evalCode,
    };
};

export default useEvalCode;
