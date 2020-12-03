import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import ideaReducer from "./ideaReducers";
import teamReducer from "./teamReducers";
export default combineReducers({
  auth: authReducer,
  idea: ideaReducer,
  errors: errorReducer,
  team: teamReducer
});