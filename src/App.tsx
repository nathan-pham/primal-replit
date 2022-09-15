import AppWrapper from "./components/AppWrapper";

import ContextInput from "./components/ContextInput";
import Context from "./components/Context";

const App = () => {
    return (
        <AppWrapper>
            <Context />
            <ContextInput />
        </AppWrapper>
    );
};

export default App;
