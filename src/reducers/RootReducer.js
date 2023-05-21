import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingReducer";
import filterStateReducer from "./FilterStateReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  filter: filterStateReducer
})

export default rootReducer;