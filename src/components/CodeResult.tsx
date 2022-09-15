import { Store } from "../hooks/useStore.d";
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

        default:
            return <span>{JSON.stringify(root.value)}</span>;
    }
};

export default CodeResult;
