import { USER_LOGGED_IN } from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
