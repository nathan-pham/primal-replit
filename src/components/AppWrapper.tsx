import { ReactNode } from "react";

interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
    return (
        <main className="font-mono mx-auto bg-slate-900 min-h-screen w-screen text-white p-4">
            JavaScript REPL v0.0.0
            {children}
        </main>
    );
};

export default AppWrapper;
