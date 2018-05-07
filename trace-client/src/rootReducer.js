import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import submissionReducer from "./reducers/submissionReducer";

export default combineReducers({
  auth: authReducer,
  submission: submissionReducer
});
