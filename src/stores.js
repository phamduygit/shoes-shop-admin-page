import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/RootReducer";

const store = configureStore({reducer: rootReducer})

export default store;