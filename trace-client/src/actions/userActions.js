import { GET_USERS, GET_PROFILE } from "./types";
import api from "../api";

export const fetchUsers = () => dispatch =>
  api.users
    .usersList()
    .then(users => {
      dispatch({
        type: GET_USERS,
        payload: users
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: []
      })
    );

export const getCurrentProfile = () => dispatch =>
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

export const createProfile = data => dispatch => api.users.createProfile(data);

export const addImmigrationInfo = data => dispatch =>
  api.users.addImmigrationInfo(data);

export const addExperience = data => dispatch => api.users.addExperience(data);

export const addEducation = data => dispatch => api.users.addEducation(data);
