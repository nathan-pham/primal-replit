import { Store } from "../../hooks/useStore.d";
import CodeResult from "../CodeResult";
import ResultExpand from "./ResultExpand";

interface ResultObjectProps {
    object: Store["result"];
    id: string;
    defaultOpen?: boolean;
}

const ResultObject = ({ object, id, defaultOpen }: ResultObjectProps) => {
    return (
        <ResultExpand defaultOpen={defaultOpen} startWith="{" endWith="}">
            {object[id].value.map((prop: any) => {
                const { key: keyId, value: valueId } = prop;

                return (
                    <div key={keyId} className="pl-4">
                        <CodeResult value={object} id={keyId} />:{" "}
                        <CodeResult value={object} id={valueId} />
                    </div>
                );
            })}
        </ResultExpand>
    );
};

export default ResultObject;
