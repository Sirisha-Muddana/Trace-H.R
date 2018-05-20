import {
  GET_TIMESHEETS,
  GET_ALL_TIMESHEETS,
  TIMESHEETS_LIST,
  GET_IMAGE
} from "../actions/types";

const initialState = {
  timesheetsList: {},
  allTimesheetsList: {},
  getTimesheets: {},
  image: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
