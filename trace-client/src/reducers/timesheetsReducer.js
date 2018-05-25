import {
  GET_TIMESHEETS,
  GET_ALL_TIMESHEETS,
  TIMESHEETS_LIST,
  TIMESHEET_LOADING,
  GET_IMAGE,
  NEW_ITEM,
  TIMESHEETS_LIST_BY_DATE
} from "../actions/types";

const initialState = {
  timesheetsList: {},
  allTimesheetsList: {},
  getTimesheets: {},
  getTimesheetsByDate: {},
  image: {},
  loading: false,
  new_item: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TIMESHEET_LOADING:
      return {
        ...state,
        loading: true
      };
    case NEW_ITEM:
      return {
        ...state,
        new_item: true
      };

    case GET_TIMESHEETS:
      return {
        ...state,
        timesheetsList: action.payload,
        loading: false
      };
    case GET_ALL_TIMESHEETS:
      return {
        ...state,
        allTimesheetsList: action.payload,
        loading: false
      };
    case TIMESHEETS_LIST:
      return {
        ...state,
        getTimesheets: action.payload,
        loading: false
      };
    case TIMESHEETS_LIST_BY_DATE:
      return {
        ...state,
        getTimesheetsByDate: action.payload,
        loading: false
      };
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
        loading: false,
        new_item: false
      };

    default:
      return state;
  }
}
