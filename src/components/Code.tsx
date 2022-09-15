import Chevron from "./Chevron";

interface CodeProps {
    value: string;
}

const Code = ({ value }: CodeProps) => {
    return (
        <div className="flex gap-2 mt-2">
            <Chevron />
            <code>
                <pre>{value}</pre>
            </code>
        </div>
    );
};

export default Code;
