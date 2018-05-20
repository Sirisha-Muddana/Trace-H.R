import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import submissionReducer from "./reducers/submissionReducer";
import usersReducer from "./reducers/usersReducer";
import timesheetsReducer from "./reducers/timesheetsReducer";

export default combineReducers({
  auth: authReducer,
  submission: submissionReducer,
  users: usersReducer,
  timesheets: timesheetsReducer
});
