import { useState, ReactNode } from "react";
import { Store, Types } from "../hooks/useStore.d";
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
            return <p>undefined</p>;

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
