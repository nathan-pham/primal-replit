import { Store } from "../hooks/useStore.d";
import ResultArray from "./results/ResultArray";
import ResultObject from "./results/ResultObject";

interface CodeResultProps {
    value: Store["result"];
    id?: string;
    defaultOpen?: boolean;
}

const CodeResult = ({ value, id = "0", defaultOpen }: CodeResultProps) => {
    const root = value[id];

    switch (root.type) {
        case "undefined":
        case "null":
            return <span className="text-gray-500">{root.type}</span>;

        case "string":
            return (
                <span
                    className={`text-green-500 before:content-["'"] after:content-["'"]`}
                >
                    {root.value}
                </span>
            );

        case "error":
            return <span className="text-red-500">{root.value}</span>;

        case "object":
            return (
                <>
                    <ResultObject
                        object={value}
                        id={id}
                        defaultOpen={defaultOpen}
                    />
                </>
            );

        case "array":
            return (
                <ResultArray object={value} id={id} defaultOpen={defaultOpen} />
            );

        case "directive":
            return <pre className="text-white">{root.value}</pre>;

        default:
            return (
                <span className="text-yellow-500">{root.value.toString()}</span>
            );
    }
};

export default CodeResult;
