import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import submissionReducer from "./reducers/submissionReducer";
import usersReducer from "./reducers/usersReducer";

export default combineReducers({
  auth: authReducer,
  submission: submissionReducer,
  users: usersReducer
});
