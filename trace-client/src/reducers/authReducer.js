import { USER_LOGGED_IN, SUCCESS_MESSAGE } from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  success: false
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        success: false
      };

    case SUCCESS_MESSAGE:
      return {
        ...state,
        success: true
      };
    default:
      return state;
  }
}
