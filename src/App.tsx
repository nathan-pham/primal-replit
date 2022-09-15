import AppWrapper from "./components/AppWrapper";

import ContextInput from "./components/ContextInput";
import Context from "./components/Context";
import ScrollTop from "./components/ScrollTop";

const App = () => {
    return (
        <AppWrapper>
            <Context />
            <ContextInput />
            <ScrollTop />
        </AppWrapper>
    );
};

export default App;
