import useStore from "../hooks/useStore";
import Code from "./Code";
import CodeResult from "./CodeResult";

const Context = () => {
    const context = useStore((state) => state.context);

    return (
        <>
            {context.map((value, i) => {
                if (typeof value === "string") {
                    return <Code key={i} value={value} />;
                }

                return <CodeResult key={i} value={value} id="0" defaultOpen />;
            })}
        </>
    );
};

export default Context;
