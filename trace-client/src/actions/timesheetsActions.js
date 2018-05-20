import {
  GET_TIMESHEETS,
  GET_ALL_TIMESHEETS,
  TIMESHEETS_LIST,
  GET_IMAGE
} from "./types";
import api from "../api";

export const fetchTimesheets = () => dispatch => {
  //dispatch(setSubmissionLoading());
  api.timesheets
    .timesheets()
    .then(timesheets => {
      dispatch({
        type: GET_TIMESHEETS,
        payload: timesheets
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TIMESHEETS,
        payload: {}
      })
    );
};

export const fetchAllTimesheets = () => dispatch => {
  //dispatch(setSubmissionLoading());
  api.timesheets
    .allTimesheets()
    .then(allTimesheets => {
      dispatch({
        type: GET_ALL_TIMESHEETS,
        payload: allTimesheets
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_TIMESHEETS,
        payload: {}
      })
    );
};

export const getTimesheets = id => dispatch => {
  //dispatch(setSubmissionLoading());
  api.timesheets
    .getTimesheets(id)
    .then(timesheets => {
      dispatch({
        type: TIMESHEETS_LIST,
        payload: timesheets
      });
    })
    .catch(err =>
      dispatch({
        type: TIMESHEETS_LIST,
        payload: null
      })
    );
};

export const getImage = filename => dispatch => {
  //dispatch(setSubmissionLoading());
  api.timesheets
    .getImage(filename)
    .then(image => {
      dispatch({
        type: GET_IMAGE,
        payload: image
      });
    })
    .catch(err =>
      dispatch({
        type: GET_IMAGE,
        payload: null
      })
    );
};

export const uploadTimesheets = (formData, config) => dispatch =>
  api.timesheets.uploadTimesheet(formData, config);
