import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { v4 } from "uuid";
import { Store } from "./useStore.d";

const useStore = create(
    immer<Store>((set) => ({
        set: (fn) => set(fn),

        contextId: v4(),
        resetContextId: () => set({ contextId: v4(), context: [] }),

        context: [],
        result: {},
    }))
);

export default useStore;
