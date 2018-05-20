import {
  SUBMISSION_LIST,
  GET_SUBMISSION,
  GET_SUBMISSIONS,
  SUBMISSION_LOADING
} from "../actions/types";

const initialState = {
  submissionList: [],
  submission: null,
  getSubmissions: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMISSION_LOADING:
      return {
        ...state,
        loading: true
      };
    case SUBMISSION_LIST:
      return {
        ...state,
        submissionList: action.payload,
        loading: false
      };
    case GET_SUBMISSION:
      return {
        ...state,
        submission: action.payload,
        loading: false
      };
    case GET_SUBMISSIONS:
      return {
        ...state,
        getSubmissions: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
