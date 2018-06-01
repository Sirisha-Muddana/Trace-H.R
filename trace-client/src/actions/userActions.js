import {
  GET_USERS,
  GET_PROFILE,
  GET_RECRUITERS,
  USERS_LOADING,
  ALL_USERS,
  GET_EDUCATION,
  GET_EXPERIENCE
} from "./types";
import api from "../api";

export const fetchUsers = () => dispatch => {
  dispatch(setUsersLoading());
  api.users
    .usersList()
    .then(usersList => {
      dispatch({
        type: GET_USERS,
        payload: usersList
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: []
      })
    );
};
export const getCurrentProfile = () => dispatch => {
  dispatch(setUsersLoading());
  api.users
    .currentUser()
    .then(profile => {
      dispatch({
        type: GET_PROFILE,
        payload: profile
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getRecruiterList = () => dispatch => {
  dispatch(setUsersLoading());
  api.users
    .recruiterList()
    .then(recruiterList => {
      dispatch({
        type: GET_RECRUITERS,
        payload: recruiterList
      });
    })
    .catch(err =>
      dispatch({
        type: GET_RECRUITERS,
        payload: []
      })
    );
};

export const getAllUsers = () => dispatch => {
  dispatch(setUsersLoading());
  api.users
    .allUsers()
    .then(allUsers => {
      dispatch({
        type: ALL_USERS,
        payload: allUsers
      });
    })
    .catch(err =>
      dispatch({
        type: ALL_USERS,
        payload: []
      })
    );
};

export const getEducation = id => dispatch => {
  dispatch(setUsersLoading());
  api.users
    .getEducation(id)
    .then(education => {
      dispatch({
        type: GET_EDUCATION,
        payload: education
      });
    })
    .catch(err =>
      dispatch({
        type: GET_EDUCATION,
        payload: null
      })
    );
};

export const getExperience = id => dispatch => {
  dispatch(setUsersLoading());
  api.users
    .getExperience(id)
    .then(experience => {
      dispatch({
        type: GET_EXPERIENCE,
        payload: experience
      });
    })
    .catch(err =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: null
      })
    );
};

export const deleteExperience = id => dispatch => {
  api.users.deleteExperience(id).then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res
    });
  });
};

export const deleteEducation = id => dispatch => {
  api.users.deleteEducation(id).then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res
    });
  });
};

export const createProfile = data => dispatch => api.users.createProfile(data);

export const addImmigrationInfo = data => dispatch =>
  api.users.addImmigrationInfo(data);

export const addExperience = data => dispatch => api.users.addExperience(data);

export const addEducation = data => dispatch => api.users.addEducation(data);

// users loading
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
