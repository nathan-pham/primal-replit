import { IoChevronForwardOutline } from "react-icons/io5";

interface CodeProps {
    value: string;
}

const Code = ({ value }: CodeProps) => {
    return (
        <div className="flex gap-1 items-center">
            <div>
                <IoChevronForwardOutline />
            </div>
            <code>
                <pre>{value}</pre>
            </code>
        </div>
    );
};

export default Code;
