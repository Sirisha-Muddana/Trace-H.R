import {
  GET_USERS,
  GET_PROFILE,
  GET_RECRUITERS,
  ALL_USERS,
  USERS_LOADING,
  GET_EDUCATION,
  GET_EXPERIENCE
} from "../actions/types";

const initialState = {
  usersList: [],
  profile: {},
  recruiterList: [],
  allUsers: [],
  education: [],
  experience: [],
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
    case GET_EDUCATION:
      return {
        ...state,
        education: action.payload,
        loading: false
      };
    case GET_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
