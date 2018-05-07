import { SUBMISSION_LIST, GET_SUBMISSION } from "../actions/types";

const initialState = {
  submissionList: [],
  submission: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMISSION_LIST:
      return {
        ...state,
        submissionList: action.payload
      };
    case GET_SUBMISSION:
      return {
        ...state,
        submission: action.payload
      };
    default:
      return state;
  }
}
