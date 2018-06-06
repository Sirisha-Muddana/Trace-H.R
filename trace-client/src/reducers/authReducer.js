import {
  USER_LOGGED_IN,
  SUCCESS_MESSAGE,
  RESEND_EMAIL
} from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  success: false,
  resendEmail: false
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

    case RESEND_EMAIL:
      return {
        ...state,
        resendEmail: true
      };
    default:
      return state;
  }
}
