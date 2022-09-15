import { useState } from "react";
import { Store, Types } from "../../hooks/useStore.d";
import CodeResult from "../CodeResult";

interface ResultObjectProps {
    object: Store["result"];
    id: string;
    defaultOpen?: boolean;
}

const ResultObject = ({ object, id, defaultOpen }: ResultObjectProps) => {
    const [expanded, setExpanded] = useState(defaultOpen);

    return (
        <>
            <button
                className="border px-2 rounded-lg"
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                ...
            </button>
            {`{`}

            {expanded && (
                <>
                    {object[id].value.map((prop: any) => {
                        const { key: keyId, value: valueId } = prop;

                        return (
                            <div key={keyId} className="pl-4">
                                <CodeResult value={object} id={keyId} />:{" "}
                                <CodeResult value={object} id={valueId} />
                            </div>
                        );
                    })}
                </>
            )}
            {`}`}
        </>
    );
};

export default ResultObject;
