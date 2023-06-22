import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingReducer";
import filterStateReducer from "./FilterStateReducer";
import jwtReducer from "./JwtReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  filter: filterStateReducer,
  jwt: jwtReducer,
  user: userReducer
})

export default rootReducer;