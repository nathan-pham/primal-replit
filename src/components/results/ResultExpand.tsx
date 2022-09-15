import { ReactNode, useState } from "react";
import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";

interface ResultExpandProps {
    defaultOpen?: boolean;
    startWith?: string;
    endWith?: string;
    children: ReactNode;
}

const ResultExpand = ({
    defaultOpen,
    children,
    startWith,
    endWith,
}: ResultExpandProps) => {
    const [expand, setExpand] = useState(defaultOpen);

    return (
        <>
            <button onClick={() => setExpand(!expand)}>
                {expand ? (
                    <IoChevronDownOutline />
                ) : (
                    <IoChevronForwardOutline />
                )}
            </button>
            {startWith}
            {expand && children}
            {endWith}
        </>
    );
};

export default ResultExpand;
