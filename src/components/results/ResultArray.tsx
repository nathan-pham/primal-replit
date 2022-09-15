import { Store } from "../../hooks/useStore.d";
import CodeResult from "../CodeResult";
import ResultExpand from "./ResultExpand";

interface ResultArrayProps {
    object: Store["result"];
    id: string;
    defaultOpen?: boolean;
}

const ResultArray = ({ object, id, defaultOpen }: ResultArrayProps) => {
    return (
        <ResultExpand defaultOpen={defaultOpen} startWith="[" endWith="]">
            {object[id].value.map((keyId: string) => {
                return (
                    <div key={keyId} className="pl-4">
                        <CodeResult value={object} id={keyId} />,
                    </div>
                );
            })}
        </ResultExpand>
    );
};

export default ResultArray;
