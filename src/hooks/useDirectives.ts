import useStore from "./useStore";
import customBlock from "../utils/customBlock";

const help = `
.clear      Clear the console
.exit       Exit your session
.help       Get help
`;

const useDirectives = () => {
    const [set, resetContextId] = useStore((state) => [
        state.set,
        state.resetContextId,
    ]);

    const directives: Record<string, Function> = {
        clear: () => {
            set((state) => {
                state.context = [];
            });
        },
        exit: () => {
            resetContextId();
        },

        help: () => {
            return customBlock("directive", help.trim());
        },
    };

    const evalDirective = (code: string) => {
        if (directives.hasOwnProperty(code)) {
            return directives[code]();
        }

        return customBlock("error", `${code} is an invalid REPL keyword`);
    };

    return { evalDirective };
};

export default useDirectives;

// const useEvalCode = () => {
//     const [set, contextId, resetContextId] = useStore((state) => [
//         state.set,
//         state.contextId,
//         state.resetContextId,
//     ]);

//     const evalDirective = (code: string) => {
//         const directives: Record<string, Function> = {

//         };
