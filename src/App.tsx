import AppWrapper from "./components/AppWrapper";

import Input from "./components/Input";
import Context from "./components/Context";

const App = () => {
    return (
        <AppWrapper>
            <Context />
            <Input />
        </AppWrapper>
    );
};

export default App;
