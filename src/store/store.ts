import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice.ts";

export const store = configureStore({
    reducer: {
        productState: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;