import { GET_USERS, GET_PROFILE } from "../actions/types";

const initialState = {
  usersList: {},
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersList: action.payload
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
