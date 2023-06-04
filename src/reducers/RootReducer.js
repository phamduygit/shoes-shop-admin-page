import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingReducer";
import filterStateReducer from "./FilterStateReducer";
import jwtReducer from "./JwtReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  filter: filterStateReducer,
  jwt: jwtReducer,
})

export default rootReducer;