import { IoChevronUpOutline } from "react-icons/io5";

// easily get back to the top of the page
const ScrollTop = () => {
    return (
        <button
            className="fixed bottom-4 right-4 bg-blue-600 h-8 w-8 flex justify-center items-center rounded-sm"
            onClick={() => {
                window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: "smooth",
                });
            }}
        >
            <IoChevronUpOutline />
        </button>
    );
};

export default ScrollTop;
