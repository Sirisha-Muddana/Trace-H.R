import {
  SUBMISSION_LIST,
  GET_SUBMISSION,
  GET_SUBMISSIONS,
  SUBMISSION_LOADING
} from "./types";
import api from "../api";

export const fetchSubmissions = () => dispatch => {
  dispatch(setSubmissionLoading());
  api.submissions
    .submissionList()
    .then(submissions => {
      dispatch({
        type: SUBMISSION_LIST,
        payload: submissions
      });
    })
    .catch(err =>
      dispatch({
        type: SUBMISSION_LIST,
        payload: null
      })
    );
};

export const fetchSubmission = id => dispatch => {
  dispatch(setSubmissionLoading());
  api.submissions
    .getSubmission(id)
    .then(submission => {
      dispatch({
        type: GET_SUBMISSION,
        payload: submission
      });
    })
    .catch(err =>
      dispatch({
        type: GET_SUBMISSION,
        payload: null
      })
    );
};
export const getSubmissions = id => dispatch => {
  dispatch(setSubmissionLoading());
  api.submissions
    .getSubmissions(id)
    .then(submissions => {
      dispatch({
        type: GET_SUBMISSIONS,
        payload: submissions
      });
    })
    .catch(err =>
      dispatch({
        type: GET_SUBMISSIONS,
        payload: null
      })
    );
};
export const submissionForm = data => dispatch =>
  api.submissions.postSubmission(data);

// submission loading
export const setSubmissionLoading = () => {
  return {
    type: SUBMISSION_LOADING
  };
};
