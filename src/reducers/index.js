import { combineReducers } from "redux";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  user: userReducer,
});

export default rootReducer;
