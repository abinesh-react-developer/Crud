import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import postReducer from "./slice/postSlice"

const rootReducer = combineReducers({
  user: userReducer,
  posts:postReducer
  // Add more reducers here
});

export default rootReducer;