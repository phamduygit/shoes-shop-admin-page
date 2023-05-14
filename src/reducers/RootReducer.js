import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingReducer";

const rootReducer = combineReducers({
  loading: loadingReducer
})

export default rootReducer;