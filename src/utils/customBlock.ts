import { Store } from "../hooks/useStore.d";

// utility to easily create custom blocks (ie: errors or directives)
const customBlock = (type: string, value: any) =>
    ({
        "0": {
            type,
            value,
        },
    } as Store["result"]);

export default customBlock;
