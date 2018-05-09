import { SUBMISSION_LIST, GET_SUBMISSION } from "./types";
import api from "../api";

export const fetchSubmissions = () => dispatch =>
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
        payload: []
      })
    );

export const fetchSubmission = id => dispatch =>
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

export const submissionForm = data => dispatch =>
  api.submissions.postSubmission(data);
