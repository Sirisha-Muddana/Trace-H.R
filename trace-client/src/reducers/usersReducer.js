import {
  GET_USERS,
  GET_PROFILE,
  GET_RECRUITERS,
  ALL_USERS,
  USERS_LOADING
} from "../actions/types";

const initialState = {
  usersList: [],
  profile: {},
  recruiterList: [],
  allUsers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        usersList: action.payload,
        loading: false
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_RECRUITERS:
      return {
        ...state,
        recruiterList: action.payload,
        loading: false
      };
    case ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
