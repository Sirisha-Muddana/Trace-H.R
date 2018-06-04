import {
  GET_TIMESHEETS,
  GET_ALL_TIMESHEETS,
  TIMESHEETS_LIST,
  TIMESHEET_LOADING,
  GET_IMAGE,
  NEW_ITEM,
  TIMESHEETS_LIST_BY_DATE
} from "./types";
import api from "../api";

export const fetchTimesheets = () => dispatch => {
  dispatch(setTimesheetLoading());
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
  dispatch(setTimesheetLoading());
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
  dispatch(setTimesheetLoading());
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
        payload: {}
      })
    );
};

export const getTimesheetsByDate = (date, id) => dispatch => {
  dispatch(setTimesheetLoading());
  api.timesheets
    .getTimesheetsByDate(date, id)
    .then(timesheets => {
      dispatch({
        type: TIMESHEETS_LIST_BY_DATE,
        payload: timesheets
      });
    })
    .catch(err =>
      dispatch({
        type: TIMESHEETS_LIST_BY_DATE,
        payload: {}
      })
    );
};

export const getImage = filename => dispatch => {
  dispatch(setTimesheetLoading());
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
        payload: {}
      })
    );
};

export const uploadTimesheets = (formData, config) => dispatch =>
  api.timesheets.uploadTimesheet(formData, config).then(data => {
    dispatch(setNewItem());
  });

// submission loading
export const setTimesheetLoading = () => {
  return {
    type: TIMESHEET_LOADING
  };
};

// submission loading
export const setNewItem = () => {
  return {
    type: NEW_ITEM
  };
};
